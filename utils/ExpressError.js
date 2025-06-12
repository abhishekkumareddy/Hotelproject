class ExpressError extends Error{
    constructor(statuscode,message){
        super();
        this.statuscode=this.statuscode;
        this.message=this.message;
    }
}

module.exports=ExpressError;