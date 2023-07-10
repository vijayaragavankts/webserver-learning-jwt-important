const express = require( "express" );
const jsonwebtoken = require( "jsonwebtoken" );
const app = express();


app.get( '/', async ( req, res ) => {
    let token = await jsonwebtoken.sign( {
        date: new Date
    }, "ejhuiby78uyrt8uyer8c7ty7crb7eritcevinthabcdvbudvnisvb" );
    console.log( token );
    res.json( {
        message: "success",
        token: token,
    } )
} )

app.get( '/check/:token', async ( req, res ) => {
    console.log( req.params.token );
    let token = req.params.token;
    try {
        let tokenResult = await jsonwebtoken.verify( token, "ejhuiby78uyrt8uyer8c7ty7crb7eritcevinthabcdvbudvnisvb" )
        console.log( tokenResult );
        if ( tokenResult ) {
            res.json( {
                message: "success",
                date: new Date( tokenResult.date ).getDate()
            } );
        } else {
            res.status( 401 ).res.json( {
                message: "Error",
            } )
        }

    } catch ( err ) {
        res.json( {
            message: 'error'
        } )
    }

} );

app.listen( 3000, () => {
    console.log( "Server Listening in port 3000" );
} )