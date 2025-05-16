
/**
 * @param { ...string } inputs - Class names to combine.
 * @returns { string } - Combined class names.
 */

export function cn ( ...inputs ) {

    return inputs.filter ( Boolean ).join ( " " );

}
  