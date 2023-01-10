
const ProductModel = require("../../models/Product");
class HomeProducts {
  async catProducts(req, res) {
    const { name, page , keyword} = req.params;
    const parPage = 5;
    const skip = (page - 1) * parPage;
    const option = name ? {category:name}: keyword && {title:{$regex: `${keyword}`, $options:"i"}}
    if(page){
    try {
      const count = await ProductModel.find({ ...option })
        .where("stock")
        .gt(0)
        .countDocuments();
      const response = await ProductModel.find({ ...option })
        .where("stock")
        .gt(0)
        .skip(skip)
        .limit(parPage)
        .populate("reviewsId")
        .sort({ updatedAt: -1 });
      return res.status(200).send({ products: response, parPage, count });
    } catch (error) {
      console.log(error.message);
    }
  }else {
    const response =  await ProductModel.find({...option})
    .where("stock")
    .gt(0)
    .limit(4)
    .populate("reviewsId")
    .sort({updatedAt:-1})
    return res.status(200).send({products: response})
  }
  }
}

module.exports = new HomeProducts();
