const mrup = require('./mrup.js');

it('should emit text', () => {
    let emit = jest.fn();
    mrup('Hello!', emit);

    expect(emit.mock.calls.length).toBe(1);
    
    expect(emit.mock.calls[0]).toEqual(['text', 'Hello!']);
});

it('should emit tag with no parameters', () => {
    let emit = jest.fn();
    mrup('{foo}', emit);

    expect(emit.mock.calls.length).toBe(1);
    
    expect(emit.mock.calls[0]).toEqual(['foo', []]);
})

it('should emit tag with one parameter', () => {
    let emit = jest.fn();
    mrup('{foo http://foo.com}', emit);

    expect(emit.mock.calls.length).toBe(1);
    
    expect(emit.mock.calls[0]).toEqual(['foo', ['http://foo.com']]);
})

it('should emit tag with multiple parameters', () => {
    let emit = jest.fn();
    mrup('{foo http://foo.com; This is a thing}', emit);

    expect(emit.mock.calls.length).toBe(1);
    
    expect(emit.mock.calls[0]).toEqual(['foo', ['http://foo.com', 'This is a thing']]);
})

it('should support empty params', () => {
    let emit = jest.fn();
    mrup('{foo http://foo.com; ; Another thing}', emit);

    expect(emit.mock.calls.length).toBe(1);
    
    expect(emit.mock.calls[0]).toEqual(['foo', ['http://foo.com', '', 'Another thing']]);
})

it('should normalize white space at end of params', () => {
    let emit = jest.fn();
    mrup('{foo bar ; zim}', emit);

    expect(emit.mock.calls.length).toBe(1);
    
    expect(emit.mock.calls[0]).toEqual(['foo', ['bar', 'zim']]);
})

it('should throw when syntax is invalid at end of source', () => {
    let emit = jest.fn();
    expect(() => {
        mrup('{foo', emit);
    }).toThrow(/unexpected end of input/);
})

it('should throw when syntax is invalid in middle of source', () => {
    let emit = jest.fn();
    expect(() => {
        mrup('{|', emit);
    }).toThrow(/unexpected "|"/);
})

it('should emit text, tag, text', () => {
    let emit = jest.fn();
    mrup('This is text {foo bar; zim} And this is text', emit);

    expect(emit.mock.calls.length).toBe(3);
    
    expect(emit.mock.calls[0]).toEqual(['text', 'This is text ']);
    expect(emit.mock.calls[1]).toEqual(['foo', ['bar', 'zim']]);
    expect(emit.mock.calls[2]).toEqual(['text', ' And this is text']);
})
