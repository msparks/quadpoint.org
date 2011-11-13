---
layout: default
title: Engine Yard hashing contest postmortem
parent: projects
date: 2009-07-21 23:50:00
Time-stamp: <2011-11-13 04:36:51>
---

<div class="subtitle meta">Basic performance tricks in C code</div>

It's over. Finally. On July 20-21, 2009, <a href="http://engineyard.com"
target="_blank">Engine Yard</a> held a <a
href="http://www.engineyard.com/blog/2009/programming-contest-win-iphone-3gs-2k-cloud-credit/"
target="_blank">contest</a> to find the smallest <a
href="http://en.wikipedia.org/wiki/Hamming_distance" target="_blank">hamming
distance</a> to a given SHA-1 hash by hashing permutations of 12 words from a
given dictionary, and optionally 5 ASCII characters appended to the end. I've
spent the last several evenings writing, rewriting, and optimizing my C
implementation and distributed infrastructure.

This is my _postmortem_ of the project.

## About the contest

Before I explain what I did specifically, I'll explain what the above paragraph
means. A <a href="http://en.wikipedia.org/wiki/Cryptographic_hash_function"
target="_blank">hash function</a> simply takes some input and produces some
fixed-size output. They are deterministic, too, so the same input will always
produce the same output. Hash values are essentially just very large numbers
that input values map to. In the case of SHA-1, the output is 160 bits long,
meaning that SHA-1 hash values range from 0 to \\(2^{160} - 1\\) =
1461501637330902918203684832716283019655932542975 (base 10).

The given phrase for the contest was "I would much rather hear more about
your whittling project" which hashes to
<tt>1249c4b7f578204f10798c0269f8488280fb9981</tt> in hexadecimal (base 16). In
binary (base 2), this is:

    0001001001001001110001001011011111110101
    0111100000100000010011110001000001111001
    1000110000000010011010011111100001001000
    1000001010000000111110111001100110000001

To reiterate, the goal of the contest was to find a phrase of 12 words (and
optionally 5 ASCII characters at the end) that would produce a SHA-1 hash with
the fewest bit flips away from the challenge hash. The number of bit flips
between hashes is called the hamming distance. For example, the hamming
distance between "00011" and "10010" is 2; two bits need to be flipped in
"00011" to turn it into "10010".

Hash functions are supposed to generate fairly well-distributed hashes such
that even a very small change (say, one bit flip in the input) will produce an
entirely different hash output. This 'randomness' makes the math quite easy: if
we assume that if we have a 50% chance of correctly guessing each of the 160
bits when generating the hash for a random phrase, the result is a <a
href="http://en.wikipedia.org/wiki/Binomial_distribution"
target="_blank">binomial distribution</a>. **This means that for each phrase,
we're essentially flipping 160 coins and hoping to get as many heads as
possible.**

## Some math

So, the question is, how hard is it, really, to get all heads, or even close?
The short answer is: hard. For this contest, the <a
href="http://twitter.com/CodingCrypto/status/2768436494" target="_top">winning
entry</a> had a hamming distance of 30. Generating hashes at random, the
probability of getting a 30 is 1 in:

<div>
$${160 \choose 30} \cdot 0.5^{130} \cdot 0.5^{30} = 5.317 \times 10^{15}$$
</div>

To even come close to a 30, one would need a very large number of powerful
processors, or some hardware designed to do calculations. <a
href="http://twitter.com/spworley">Steve Worley</a> released a <a
href="http://nvidia.com/cuda" target="_top">CUDA</a> implementation for the
contest on nVidia's forums a few days ago. High-end nVidia GPUs were able to
process hundreds of millions of hashes per second, whereas lowly CPU-only
implementations could only do a few million per second per core.

## My implementation

I wrote my implementation in <a
href="http://en.wikipedia.org/wiki/C_%28programming_language%29"
target="_top">C</a>. It started out in C++, but after simplifying my searching
algorithm, I removed a lot of complexity and dropped down to pure C. The
fastest I was able to get out of my implementation was 3.2M hashes/sec/core on
a Xeon 2.13GHz.

My code is available on GitHub: [sham](https://github.com/msparks/sham)

My general searching algorithm:

1. Pick a random set of 12 words
2. For 1,000,000 iterations, randomize one of the ASCII characters at the end
   of the phrase per iteration.
3. Calculate SHA-1.
4. Repeat

My main goal was to do as little work as possible each iteration, and just
crank out as many hashes as the processor could compute. Thus, I did not vary
capitalization of letters, and only randomized one ASCII character per
iteration, instead of all 5.

Here are some other things I did to reduce time per iteration, in no particular
order:

* Used OpenSSL for hashing.  
  In the interest of time, correctness, and speed, I did not try to implement
  SHA-1 for this contest.

* Compiler optimizations.  
  -O3. A given.

* Kept a `SHA_CTX` structure around for the current phrase.  
  `SHA1_Update()` in
  libcrypto will calculate chunks of input at a time, and the result context
  can be stored in memory to be updated later and finalized. I picked a new set
  of 12 words every million iterations, and when I picked a new set, I
  calculated the SHA_CTX for that set and kept it in memory. Thus, each
  iteration only needed to run the characters since the last SHA chunk boundary
  and the following 5 ASCII characters, instead of the whole string.

* Pick sets 'intelligently' based on length.  
  `pick_minimal_set()` in my implementation would repeatedly pick a random set
  of 12 words until the length of the resulting phrase was within 5 characters
  of a chunk boundary (512 bits; 64 bytes). Thus, each iteration would have to
  SHA a maximum of 10 characters.

* Used gcc builtin.  
  Counting bits manually is slow. Use `__builtin_popcount*()` to do it for you.

* Profiled.  
  I used <a
  href="http://developer.apple.com/tools/shark_optimize.html">Shark</a>.

## Distributed Infrastructure

Calculating SHA-1s from a well-known fixed dictionary is an
[embarrassingly parallel] problem. Nevertheless, I still wanted an easy way to
monitor all of the running instances. I wrote a simple Python client to send
result phrases to a matching Python server sitting on my server. It computed
the hamming distance and showed the new minimum distances as they came in.

Here's the log from my monitoring server, showing timestamps and lowest
distances. Hostnames removed.

    2009-07-20 12:04:53,357 - *** shamserver starting ***
    2009-07-20 12:04:53,357 - challenge phrase: I would much rather hear more about your whittling project
    2009-07-20 12:04:53,357 - challenge hash: 1249c4b7f578204f10798c0269f8488280fb9981
    2009-07-20 12:05:46,233 - [xxxxx] distance: 46
    2009-07-20 12:05:46,233 - [xxxxx] phrase:
    pieprzyk sass git utc regex command sqlserver sysoev threading newman sockets lampson ][;?=
    2009-07-20 12:05:56,453 - [xxxxx] distance: 45
    2009-07-20 12:05:56,453 - [xxxxx] phrase:
    record rake oscon rfc1157 clone processes applet procs frozen inline chain resource ^QvH5
    2009-07-20 12:06:12,061 - [xxxxx] distance: 44
    2009-07-20 12:06:12,061 - [xxxxx] phrase:
    debug chore amp renders behlendorf reports kurtz url joy icon response bigtable &CVpu
    2009-07-20 12:06:30,838 - [xxxxx] distance: 43
    2009-07-20 12:06:30,838 - [xxxxx] phrase:
    lampson dependency key xkcd syslogs assoc mailers uniq json atbash helper browser 4c/3Q
    2009-07-20 12:06:51,466 - [xxxxx] distance: 38
    2009-07-20 12:06:51,466 - [xxxxx] phrase:
    rfc959 error hillis lib debug href proc watson capistrano hawkes deprecate iverson 1,*D@
    2009-07-20 12:11:49,624 - [xxxxx] distance: 36
    2009-07-20 12:11:49,624 - [xxxxx] phrase:
    textmate ubuntu montulli winograd paths joshp binary rails friedman tests kindi oikarinen dg'7O
    2009-07-20 14:00:27,171 - [xxxxx] distance: 35
    2009-07-20 14:00:27,171 - [xxxxx] phrase:
    stearns sub nodoc whitfield thread parse beta solo erb kurtz torvalds nitems E,giH
    2009-07-20 14:23:22,954 - [xxxxx] distance: 34
    2009-07-20 14:23:22,954 - [xxxxx] phrase:
    dystopia services syntax regexp heinemeier computes metaprogramming rescue summit yin record wadler 3[G^_
    2009-07-20 20:44:23,431 - [xxxxx] distance: 32
    2009-07-20 20:44:23,431 - [xxxxx] phrase:
    blocks rfc2810 shannon nodes host rdoc wep joshp size perform applet rescue HlKLr

The lowest distance I found was 32. I estimate that I calculated about 25-30
trillion SHA-1s in the 30-hour period.

## Final thoughts

Overall, the contest was a blast. I've done nothing else for the last few
evenings, but writing the code and optimizing was a great learning
experience. Using [compiler builtins] and Apple's [Shark] were new to me. Shark
is especially awesome and generally more accessible than gprof for profiling.
In hindsight, though, I should have focused on a CUDA implementation early on.

[embarrassingly parallel]: http://en.wikipedia.org/wiki/Embarrassingly_parallel
[compiler builtins]: http://developer.apple.com/documentation/developertools/gcc-4.0.1/gcc/Other-Builtins.html
[Shark]: http://developer.apple.com/tools/shark_optimize.html
