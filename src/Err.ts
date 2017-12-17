import Catamorphism from './Catamorphism';
import Result from './Result';

class Err<E, A> extends Result<E, A> {
  private error: E;
  constructor(theError: E) {
    super();
    this.error = theError;
  }

  public getOrElse(fn: () => A): A {
    return fn();
  }

  public getOrElseValue(defaultValue: A): A {
    return defaultValue;
  }

  public map<B>(fn: (_: A) => B): Result<E, B> {
    return new Err<E, B>(this.error);
  }

  public mapError<X>(fn: (err: E) => X): Result<X, A> {
    return new Err(fn(this.error));
  }

  public andThen<B>(fn: (_: A) => Result<E, B>): Result<E, B> {
    return new Err<E, B>(this.error);
  }

  public orElse<X>(fn: (err: E) => Result<X, A>): Result<X, A> {
    return fn(this.error);
  }

  public cata<B>(matcher: Catamorphism<E, A, B>): B {
    return matcher.Err(this.error);
  }

  public ap<B, C>(result: Result<E, B>): Result<E, C> {
    return new Err<E, C>(this.error);
  }
}

/**
 * A convenience function for creating a new Err.
 */
const err = <E, A>(e: E): Result<E, A> => new Err<E, A>(e);

export default Err;
export { err };
