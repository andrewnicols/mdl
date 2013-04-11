Moodle Assister
===============

Moodle Assister (mdl) is a convenience tool to aid moodle development. It
allows use of different versions of JavaScript tools used in the different
versions of Moodle.

Current Build Status
--------------------
[![Build Status](https://secure.travis-ci.org/andrewnicols/mdl.png?branch=master)](http://travis-ci.org/andrewnicols/mdl)

What's it for?
--------------

Since Moodle 2.5, we've started to run out JavaScript code through a
variety of tools to give such joys as correctly linted, and minified
JavaScript, with reusable meta-data.

Given that these tools are used to build code which is then included in
our repositories, we need to ensure that we can have repeatable builds
across different branches. So if the build method changes between tool
version A and version B and this leads to differences in the built code, we
need to ensure that we continue building the same code for all versions of
Moodle which were previously built using tool version A.

How do I use it?
----------------

Currently it only support shifter. I hope to have support for less/recess
shortly, yuidoc, and jshint.

One of the feautres of mdl is that it will attempt to select the correct
version of the relevant tools for each version of Moodle. It does so by
reading the version.php file and attempting to work out which version to
run with.

You can also force a specific version of the tools using the --forcebranch
option. For example:

    mdl --forcebranch 25

### Shifter

#### Basic Incantation

    mdl -s

This will work out your current location and run the appropriate actions:

* if you are in a src directory, it will run `shifter --walk`;
* if you are in a subdirectory of a src directory, it will run `shifter`; and
* if you are in any other directory, it will run `shifter --walk --recursive`.

It additionally supports the `-v` option as a shortcut to --lint-stderr
You can additionally pass it any existing shifter options


How does that work?
-------------------

When a new version of Moodle is branched, a new version of the mdl-sub tool
should also be branched capturing the dependencies for that version of
Moodle. The name is also updated to reflect the version of Moodle it
corresponds to.
