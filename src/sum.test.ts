const sum = (num1: number, num2: number) => {
  return num1 + num2;
};

it('should be able to add two numbers together', () => {
  expect(sum(3, 4)).toBe(7);
});

export default {};
