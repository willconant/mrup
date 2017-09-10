# mrup #

Mrup is a simple markup syntax. There is no practical reason for it to exist. I got sidetracked while working on my blog. Forgive me.

## Syntax ##

Mrup is text with tags. A tag looks like this:

    {foo}

A tag can have a parameter:

    {link http://foo.com}

A tag can have multiple parameters:

    {link Foo is here; http://foo.com}

There are no open tags or close tags. But this can work:

    {bold}Hello{end}

## API ##

`mrup` is a function that takes a source string and a function. As it parses the source string, it calls the function with text and tag nodes.

For text nodes, the function is called with these parameters:

  1. The string `'text'`
  2. The actual text string

For tag nodes, the function is called with these parameters:

  1. The type of tag
  2. An array of tag arguments

So, for the tag `{foo bar; zim}`, the function is called with the parameters `['foo', ['bar', 'zim']]`.
