class Apifeateures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  // search method
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }
  // filter methtod
  filter() {
    const queryCopy = { ...this.queryStr }; // const queryCopy =this.queryStr //if any changes in queryCopy then original queryStr changes so use spread operator
    // removing fields for category to  filter category
    const removedFields = ["keyword", "page", "limit"];
    removedFields.forEach((key) => delete queryCopy[key]);

    // filter for price
    // console.log(queryCopy);
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, "$$" + "$1");
    this.query = this.query.find(JSON.parse(queryStr));
    // console.log(queryStr);
    return this;
  }
  // pagination
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = Apifeateures;
