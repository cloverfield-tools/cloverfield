# Cloverfield Boilerplate Scaffold Generator [![Circle CI](https://circleci.com/gh/cloverfield-tools/cloverfield.svg?style=svg)](https://circleci.com/gh/cloverfield-tools/cloverfield)

Cloverfield aims to create a greenfield, next generation JavaScript project boilerplate scaffolding tool. That means we'll use the tools that coders in-the-know will be using over the next 1 - 3 years. We're starting with the 2016 edition. [Read more](https://github.com/ericelliott/cloverfield/blob/master/README.md).

Please help us decide what this will be by looking at the [open issues](https://github.com/ericelliott/cloverfield/issues).

## cf CLI

![cli-framework](https://cloud.githubusercontent.com/assets/175264/8508012/c64cd7c4-22a1-11e5-8ee0-69aeb5219f51.gif)


## Why Cloverfield?

> "Simplicity is about subtracting the obvious, and adding the meaningful." - John Maeda

Developers spend too much time making tech selections that ultimately have very little to do with the app they're building. Cloverfield's recommended tech selections are curated by experts who have built many apps used by millions of people.

Every project has to start somewhere. So why not start with a project that already has best-in-class static analysis tools, task runners, easy test framework setup, painless [universal JavaScript application](https://leanpub.com/learn-javascript-react-nodejs-es6/) framework, and just the right number of folders and scaffolds with just the right names?


## What should Cloverfield be?

Cloverfield should be prescriptive about chosing the right tooling, with an emphasis on flexibility looking into the future. It should help users make good choices that build on web platform standards that will survive long term, not get thrown away with last year's fashions.

* **Modular libraries**, not *monolithic frameworks*
* **Well maintained default scaffolds** for apps & packages


## What should Cloverfield not be?

Cloverfield should not be strongly tied to any particular framework-of-the-minute. Angular, Ember, Meteor users, please try to contribute in a way that the rest of the community can benefit from. We'll lean heavily toward established web standards, and help you figure out how to integrate them smoothly with **your framework of choice.**

Any scaffolds for specific library ecosystems should use the library in the title, e.g.: `cf-react-application`


## Why not Yeoman?

* **Cloverfield** is a tool for *eliminating tech choices* that don't impact what your app will be so you can concentrate on building *your app, not your boilerplate*.
* **Yeoman** is an ecosystem of scaffolds with a CLI hard-coded to tap that ecosystem.

### Put another way:

* **Yeoman** gives you lots of choices to dig into and investigate, many of them very similar to each other. It's hard to understand which scaffolds you should use.
* **Cloverfield** makes the tooling choices for you, so you can concentrate on making app choices.


### What's wrong with the Yeoman ecosystem?

The Yeoman ecosystem has **a big signal-to-noise problem**.

The yo generator ecosystem is aging, and the tools used by yo generators don't fit easily into modern JavaScript application workflows. Yeoman backed Bower for front-end tooling instead of looking to the future of universal JavaScript apps with standard ES6 modules packaged on npm. Bower's share of the package repo market is miniscule. It's clear that the future belongs to npm.

Generator discovery is a big problem. With so many different combinations of technology available, which one should you choose? There is no obvious solution, and you will spend a lot of time investigating possibilities which are not good enough.


### How will the Cloverfield ecosystem be better?

The Cloverfield ecosystem, by contrast, is small, and we intend to keep it that way. Cloverfield will always officially recommend only a handful of scaffolds, employing what we believe to be the current best practices.

Each scaffold in the Cloverfield scaffold set will be actively maintained.

You're free to develop your own cloverfield scaffolds, and even submit them for inclusion in the core set. However, we will not encourage Cloverfield users to explore unapproved community contributions. Your users will find you via npm search, GitHub, Google, or word-of-mouth.

Eventually we may solve the discovery problem that plagues both Yeoman & npm. Until then, if you choose to explore the community scaffolds, *caveat emptor.*


#### Doesn't Yeoman Have Official Generators?

Yes, but they haven't aged well, and the Yeoman philosophy is "all contributors welcome". They build discovery into the CLI, and their community ecosystem is large and active. Some might call it "vibrant". We think it's a bit crowded.

If you want to build an Angular 2.0 scaffold, or Ember, Polymer, or the next hot framework that's sure to take over tomorrow, we encourage you to contribute those innovations to the Yeoman ecosystem.

---

Conceived for ["Learn JavaScript with Eric Elliott"](https://ericelliottjs.com/)
