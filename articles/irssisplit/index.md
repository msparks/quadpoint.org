---
layout: default
title: An Illustrated Guide to Split Windows in Irssi
date: 2005-10-16
Time-stamp: <2014-10-05 02:49:01>
---

The ability to create "split" windows in [Irssi](http://irssi.org) is one of
its most useful, but confusing, features. This guide is intended to educate you
on how to create, manipulate, and manage the splitting features in Irssi.

For the purposes of this guide, I will be using the default Irssi theme (the
one with the blue bars) on a black background. This will make it easier to see
where the containers exist. First and foremost, there is a small set of terms
which are crucial to understanding the rest of this guide:

* **Screen**: The entire visible Irssi entity. Everything seen inside of the
    terminal border will be called the 'screen'.
* **Container**: A visible, potential location for a window. Containers are
    visible portions of the screen. Each container contains exactly one visible
    window.
* **Item**: A channel, query, or status.
* **Window**: An entity that displays zero or more items. Windows *can* be
    itemless. (`/window new split` will create a new container and a new
    itemless window)
* **Sticky**: A property applied to windows. "Sticky" windows are bound to
    their containers. "Non-sticky" windows are free to move around to multiple
    containers. That is, a sticky window that is invisible will always show up
    in the same container. A single container can have multiple windows "stuck"
    to it, but a window can only be "stuck" to zero or one containers.

It is not expected for you to be very comfortable with these terms at this
point. However, as you read through the guide, refer to this list of
definitions often.

Now, open Irssi. Connect to a server and join your channels. By default, Irssi
obviously has only one container (it must have at least one, otherwise nothing
would be on the screen), and no windows are initially set sticky.

For this guide, I will be using the channels `#test2`, `#test3`, `#test4`, and
`#test5`. The numbering starts at two to keep in sync with the window reference
numbers (the status window is window 1).

![screenshot 1](/articles/irssisplit/irssi-split-1.png)

You can see from the above screenshot that 4 channels have been joined. The
status window is named "S" and is window #1. The current window is **window**
5, which has the **item** `#test5`. Notice that the only *visible* window is
window 5. The other 4 windows (1,2,3,4) are not visible. They are called
**hidden** windows. To clear any confusion, there are only two types of
windows: visible and hidden. A "split" window technically does not exist. In
the terms of this guide, the more correct term would be a "split screen". The
entity that Irssi calls a "split window" is known as a **container** here.

> Tip: Learn how to add a statusbar containing your window list on my
> [guide to irssi and screen](/articles/irssi/).

At this point, you should be comfortable with the fact that Irssi starts with
one container, which contains one visible window. Multiple containers means
multiple visible windows. Now it is time to create another container. The
current window I am in is window 5, and I want to be able to simultaneously see
window 2. This is done by using:

    /window show 2

![screenshot 2](/articles/irssisplit/irssi-split-2.png)

As you can see, the new container with `#test2` formed above the container with
`#test5`, and \[the window containing\] `#test2` became the active window. By
Irssi's definition, a "split window" refers to the window that is thrown into a
newly formed container. In this case, the new container is the portion of the
screen above the blue line in the middle of the screenshot. Essentially, it is
the top half of the screen.

By default, Irssi turns on the "`autostick_split_windows`" option. Having this
on is a generally good idea, as long as you understand what it does. If you
have this option enabled (which you probably do), window 2 is now *stuck* to
the top container. This means that window 2 will always appear in the top
container and never in the bottom container. The other four windows are
*non-sticky* and do not have a set container, so they are free to move around
to whatever the active container is. Non-sticky windows also tend to stay in
containers that have no windows stuck to them (notice 'containers' is plural:
there can be multiple containers with no windows stuck to them).

To illustrate this idea, set the newly contained window as nonsticky and
explore the consequences of not having sticky windows. To do this, type:

    /window stick 2 off

You should still have only two windows visible: 2 and 5. If window 2 is the
active window, use `Alt-3` to switch to window 3 **in that container**. You
will then have windows 3 and 5 visible. Next, use `Alt-5` to switch to window
5. You will still have the same windows visible, but window 5 will become the
active window. Now, because window 2 was unstuck, use `Alt-2` to switch to
it. You should notice that window 2 is now in the bottom container. Most sane
people would prefer windows to not jump around like this, which is why they can
be assigned to specific containers. With window 2 as the active window in the
bottom container, use `/window stick` (or `/window stick 2`). This will stick
window 2 to the bottom container, essentially anchoring it. If you use `Alt-3`
or `Alt-5` now, they will both appear in the top container.

Thus, a sticky window will not be replaced in its container by a non-sticky
window. The non-sticky window will be displayed in a container with no windows
stuck to it. If, however, there are no containers with no windows stuck to them
(that is, all containers have at least one window stuck), the requested
non-sticky window will become visible in the current container (the container
with the active window).

"Sticky-ness" of windows makes sense, but may take time to get used to. The
windows currently stuck to a container can be easily discovered by typing, in
the window in the current container:

    /window

The result will look something like this:

![screenshot 3](/articles/irssisplit/irssi-split-3.png)

The numbers next to the word "Sticky:" are the reference numbers of the windows
stuck to **that particular container**, *not* the various windows marked
sticky. In the screenshot, you can see that window 2, #test2, is stuck to the
bottom container, and the other 4 windows: 1,3,4,5 are stuck to the top
container. In this scenario, the only window that will *ever* appear in the
bottom container is window 2, since all windows are sticky and the only sticky
window in the bottom container is window 2.

## Rules

The following set of rules dictate what you can and cannot do with multiple
containers in Irssi.

### Rule 1

Irssi cannot do vertical splits, only horizontal splits. That is, windows can
only be arranged from top to bottom, never from side to side.

### Rule 2

You cannot use `/window show #` or `/window hide #` on sticky windows. Doing so
would force a window that is stuck to another container into a new container. A
remedy for this is explained below.

You also cannot use `/window show #` from within a container with at least one
window stuck to it. That is, if I were to use `/window stick 4 off` from the
bottom container in the scenario above, and then `/window show 4` to try to
create a new container and put window 4 into it, Irssi would spit out an
error. I believe this is a bug.

A violation of rule 2 will result in the following error:

    You can't show sticky windows (use /WINDOW STICK OFF)

### Rule 3

With the Irssi setting `autostick_split_windows` on, new windows created
inside a container with at least one window stick to it will be automatically
be made sticky. This is true even for one container. Try closing all windows
(which will force the screen down to one container with the status window
inside), set the status window as sticky if it is not already with `/window
stick 1`, then join a channel. Use `/window` and you will find that window 2
will be sticky.

### Rule 4

Closing a sticky window that is the only window stuck to a container will cause
that container to disappear.

### Rule 5

Using `/window move UP|DOWN` on a container with a sticky window to a container
without any sticky windows will remove the stickyless container from the
screen. The resulting container will have no sticky windows.

### Rule 6

Using `/window move UP|DOWN` on a container with no sticky windows to a
container with a sticky window will remove the stickyless container from the
screen. The resulting container will contain all sticky windows.

Rules #5 and #6 hold true regardless of the setting of
`autostick_split_windows`.

### Rule 7

Using `/window stick #` on a visible window that is in another container will
remove the other container, and the window will be stuck to the current
container.

## Manipulation of splits

* `/window show #`  
  Create a new container and put window `#` in it. See rule 2.

* `/window hide #`  
  Remove the container containing window `#` and hide `#`. See rule 2.

* `/window move up`  
  Move the current window in the current container to the container above. See
  rules 5 and 6.

* `/window move down`  
  Move the current window in the current container to the container below. See
  rules 5 and 6.

* `/window new [split]`  
  Create a new window. If `split` is specified, the new window will be created
  in a new container, and will be stuck to the new container if
  `autostick_split_windows` is `ON`. The new window is *itemless*.

* `/window balance`  
  Make all containers the same height.

* `/window grow [<lines>]`  
  Increase the height of the current container by `<lines>`. If `<lines>` is
  not specified, it is assumed to be 1.

* `/window shrink [<lines>]`  
  Decrease the height of the current container by `<lines>`. If `<lines>` is
  not specified, it is assumed to be 1.

* `/window size <lines>`  
  Set height of current container to `<lines>`.

* `/window stick [<#>] [ON|OFF]`  
  If `#` is not specified, it is assumed to be the active window. If `ON`/`OFF`
  is not specified, `ON` is assumed. This command either sticks or unsticks a
  window. If `/window stick # on` is used, window `#` will be stuck to the
  current container. If `#` was already stuck to another container, it will be
  restuck to the current container. It does not have to be unstuck from the
  other container first.


## Tips

**Tip #1**: In order to not violate rule 2, the current container needs to have
zero windows stuck to it, and the target window to be shown or hidden must be
non-sticky. Well, what if you have 35 windows with one container and you're
trying to make a new container? Do you have to unstick all your windows first
before you can make a new container? If you want to use `/window show #`,
yes. But, there is a workaround: `/window new split`.

This will create a new container with a new itemless window, without having to
unstick all windows first. Once this command is executed, you can use `/window
stick #` to stick some window `#` to the new container. You will still have an
itemless window with this method, but you can close it with `/window close`
(`/wc`).

**Tip #2**: Use a split window to log your hilights. This is described in my
[guide to Irssi and screen](/articles/irssi/).
