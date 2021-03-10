interface IMail {
  driver: 'ethereal';
  default: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.APP_DRIVER_MAIL || 'ethereal',
  default: {
    from: {
      email: 'email',
      name: 'name',
    },
  },
} as IMail;
