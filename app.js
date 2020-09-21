
/**
 * change approach is used just to show the outputs sequentially
 */
let changeApproach = (approach) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`---------------------------- ${approach} ----------------------------`)
            resolve()
        }, 5000)
    })
}

(async function() {

    /**
     * Javascript is an synchronous engine, that can use assynchronous methods eventually if needed
     * In these examples we will use some approachs to handle assynchronism
     */

    /**
     * For our tests we will use a method called "waitFor" that will use setTimeout, a function that pass
     * a callback and execute it after N miliseconds
     */

    await changeApproach('not handling assyncrhonism');

    let waitFor = (ms) => {
        setTimeout(() => {
            console.log(`Are you waiting for me for ${ms/1000} seconds?`);
        }, ms)
    }

    console.log('Yes.');

    waitFor(1000);


    /**
     * In our first example we can see that the answer "yes" came after the question.
     * This is expected, as we are not dealing with syncrhonism correctly
     */

    ////// ------ APPROACH 1 - USING CALLBACKS ------ //////
    await changeApproach('with callbacks');

    /**
     * Let's use our first approach, pass a callback, in other words a function that will be
     * invoked after the assyncrhonous task has been completed
     */

    waitFor = (ms, callback) => {

        setTimeout(() => {

            console.log(`Are you waiting for me for ${ms/1000} seconds?`);
            if ( typeof callback === 'function' )
                callback()

        }, ms)

    }

    waitFor(2000, function() {
        console.log('Yes - with callbacks')
    })



    /**
     * Hell yeah, now it works flawless...
     * Let's see the second approach
     */

    ////// ------ APPROACH 2 - USING PROMISES ------ //////
    await changeApproach('with promises');

    /**
     * In this approach we will use a promise, that is a feature of javascript
     * a promise is a Class that can accept two parameter
     * the first is called RESOLVE, and you can it when the function is correctly completed
     * the second one is called REJECT, and should be called when an error occurs
     */

    waitFor = (ms) => {

        return new Promise((resolve, reject) => {

            setTimeout(() => {

                try {

                    console.log(`Are you waiting for me for ${ms/1000} seconds?`);
                    resolve()

                } catch(error) {

                    reject(error)

                }

            }, ms)

        })

    }

    /**
     * To consume a promise, use ".then" to capture the `resolve` flow
     * and ".catch" to capture the error flow, like so:
     */

    waitFor(3000)
        .then( () => {

            console.log('Yes - with nested promise...')

        })
        .catch(error => {

            console.log('something gone wrong...', error.message)

        })


    ////// ------ APPROACH 3 - USING ASYNC/AWAIT ------ //////
    await changeApproach('async/await');

    /**
     * Finally, we can use a third approach called async/await - be aware that your environment
     * need to support this method, legacy javascript pre ES2015 don't.
     * With this approach we will "create" a promise by passing the `async` keyword before the function
     * 
     * Doing this, when the function "returns" it will "resolve" the promise
     * When the function throws an error, it will "reject" the promise
     * 
     * The keyword "await" will await for a promise to be resolved to continue the execution
     */

    waitForAsync = async (ms) => {

        try {
            // await for the promise to resolve
            await waitFor(ms)
            console.log('Yes.... With assync wait') 

            //resolve
            return 

        } catch(error) {

            //reject
            throw error

        }

    }

    waitForAsync(4000)
})()
