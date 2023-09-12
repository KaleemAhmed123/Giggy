// this is for specific error
// we use generic middleWare which handles error and expects an err obj
// in err caught at runtime that error in catch return an err obj
// but in our manual errors we dont have err obj
//  so we create err obj by passing (status, message)

const createError = (status, message) => {
  const err = new Error();
  err.status = status;
  err.message = message;

  return err;
};

export default createError;
