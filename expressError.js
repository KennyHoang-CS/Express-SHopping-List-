/**
 * Create our custom Error class.
 */

class ExpressError extends Error{
    constructor(message, status){
        super();
        this.status = status;
        this.message = message; 

        // to get the stack to appear.
        console.error(this.stack);
    }
}

module.exports = ExpressError;