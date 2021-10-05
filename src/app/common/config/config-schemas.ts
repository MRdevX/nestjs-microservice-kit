export const regexArray = {
  name: 'regexArray',
  coerce: (values: string) => values.split(',').map((v) => new RegExp(v.trim())),
  validate: function (values: string) {
    return typeof values === 'string';
  },
};
