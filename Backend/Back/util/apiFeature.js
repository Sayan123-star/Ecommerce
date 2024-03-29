class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    search(){
        const keyword=this.queryString.keyword ? {
            name:{
                $regex: this.queryString.keyword,
                $options: "i"
            }
        }:{};
        this.query = this.query.find({...keyword});
        return this;
    }
    
    pagination(resultPerpage){
        // Converting the query for the page into integer and by default is 1
        const currPage = Number(this.queryString.page) || 1
        // Skipping the products that will not be in the next page
        const skip = resultPerpage * (currPage - 1)
        this.query = this.query.limit(resultPerpage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;