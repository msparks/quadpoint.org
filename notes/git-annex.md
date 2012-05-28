---
layout: default
title: git-annex
date: 2012-05-28
Time-stamp: <2012-05-28 06:20:29>
---

## Installing on OS X

> Note: unless `sudo` is explicitly specified, all of these commands are run as
> your own user.

Install haskell-platform (includes ghc) and some depedencies:

    % brew install haskell-platform pcre md5sha1sum

Check ghc version:

    % ghc --version
    The Glorious Glasgow Haskell Compilation System, version 7.0.4

git-annex requires ghc 7.4. And installing trying to install git-annex without
an updated version yields a cryptic message about a `base-4.5.0.0`
dependency. Install the dev version of ghc using brew:

    % brew unlink ghc
    % brew install --devel ghc

Brew issues a warning that this version of haskell-platform will not work with
the devel version of ghc, but I just ignored that for now.

Update the package list in the cabal package manager, which is specific to
haskell libraries and programs:

    % cabal update

Install git-annex via cabal:

    % cabal install git-annex --bindir=$HOME/bin
