class APIFeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }
  
    filter = () => {
      const queryObj = { ...this.queryString }; // deep copy of the object
      const excludedFileds = ['page', 'sort', 'limit', 'fields'];
      excludedFileds.forEach((el) => delete queryObj[el]);
  
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|te|lte|lt)\b/g, (match) => {
        return `$${match}`;
      });
  
      this.query = this.query.find(JSON.parse(queryStr));
  
      return this;
    };
  
    sort = () => {
      if (this.queryString.sort) {
        const sortBy = this.queryString.sort.split(',').join(' ');
        this.query = this.query.sort(sortBy);
      } else {
        this.query = this.query.sort('-createdAt');
      }
  
      return this;
    };
  
    limit = () => {
      if (this.queryString.fields) {
        const fields = this.queryString.fields.split(',').join(' ');
        this.query = this.query.select(fields);
      } else {
        this.query = this.query.select('-__v'); // mongoose specific fields
      }
  
      return this;
    };
  
    paginate = () => {
      const page = Number(this.queryString.page) || 1;
      const limit = Number(this.queryString.limit) || 100;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
  
      return this;
    };
  }

  module.exports = APIFeatures;