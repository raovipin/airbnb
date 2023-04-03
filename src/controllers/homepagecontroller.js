// Get page
//homepage


exports.homep = async(req,res)=>{

    res.render('index', {title:'Welcome to AirBnb'});
}