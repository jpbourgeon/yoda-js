interface IInterface {
  element: string;
}

describe('Example Test', () => {
  it('Correctly tests stuff', () => {
    expect(true).toBeTruthy();
  });

  it('Correctly handles snapshots', () => {
    expect({ a: 1, b: 2, c: 3 }).toMatchSnapshot();
  });

  it('Correctly handles TypeScript constructs', () => {
    const interfaceInstance: IInterface = {
      element: 'a'
    };
    expect(interfaceInstance).toBeTruthy();
  });
});
