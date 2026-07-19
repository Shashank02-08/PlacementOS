class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = { ...this.queryString };

        const excludedFields = ["page", "sort", "limit", "search"];

        excludedFields.forEach(field => delete queryObj[field]);

        // Make all string filters case-insensitive
        Object.keys(queryObj).forEach(key => {
            if (typeof queryObj[key] === "string") {
                queryObj[key] = {
                    $regex: `^${queryObj[key]}$`,
                    $options: "i"
                };
            }
        });

        this.query = this.query.find(queryObj);

        return this;
    }

    search(fields = []) {
        if (this.queryString.search) {
            const keyword = this.queryString.search;

            this.query = this.query.find({
                $or: fields.map(field => ({
                    [field]: {
                        $regex: keyword,
                        $options: "i"
                    }
                }))
            });
        }

        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort("-createdAt");
        }

        return this;
    }

    paginate() {
        const page = Number(this.queryString.page) || 1;
        const limit = Number(this.queryString.limit) || 10;

        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

module.exports = ApiFeatures;