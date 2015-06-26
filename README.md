# Cloverfield Boilerplate Scaffold Generator

Cloverfield aims to create a greenfield, next generation JavaScript project boilerplate scaffolding tool. That means we'll use the tools that coders in-the-know will be using over the next 1 - 3 years. We're starting with the 2016 edition. [Read more](https://github.com/ericelliott/cloverfield/blob/master/README.md).

Please help us decide what this will be by looking at the [open issues](https://github.com/ericelliott/cloverfield/issues).


## Why Cloverfield?

Every project has to start somewhere. So why not start with a project that already has best-in-class static analysis tools, task runners, easy test framework setup, painless [universal JavaScript application](https://leanpub.com/learn-javascript-react-nodejs-es6/) framework, and just the right number of folders and scaffolds with just the right names?


## What should Cloverfield be?

Cloverfield should be prescriptive about chosing the right tooling, with an emphasis on flexibility looking into the future.


## What should Cloverfield not be?

Cloverfield should not be strongly tied to any particular framework-of-the-minute. Angular, Ember, Meteor users, please try to contribute in a way that the rest of the community can benefit from. We'll lean heavily toward established web standards, and help you figure out how to integrate them smoothly with **your framework of choice.**

Any scaffolds for specific library ecosystems should use the library in the title, e.g.: `cf-react-application`


## Why do we need yet another boilerplate / generator / scaffoldy thing?

Because yo generators tend to install everything including the kitchen sink, and are usually married for eternity to some framework-of-the-minute. Choosing to use a generator shouldn't mean that you're opting into a billion things. We should be able to say `$ cf test` and *no matter which framework we're using, a sensible test framework should be scaffolded for us with some sample tests that can successfully run headless or against something like Sauce Labs out of the box.*

In other words, having all the choices made for you is bad. **Having all the meaningless choices made for you is better.**

The tech selections don't matter **at all** as long as developers love to use our tools. In fact, it might turn out that we use yo generators under the hood (if that makes sense) and `cf` *simply selects generators for you that don't suck.*

---

Concieved for ["Learn JavaScript with Eric Elliott"](https://ericelliottjs.com/)
