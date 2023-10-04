const helpers = require("../helpers");

let rejectedOrders = [];

after(() => {
  helpers.createJsonFile("rejectedOrders.json", rejectedOrders);
  helpers.createCsvFile(rejectedOrders);
});

describe("TEST", () => {
  helpers.data.forEach((el) => {
    it(`Test for id: ${el._id}`, () => {
      const parameters = {
        provision: 0.1,
        price: 1,
        commissionBase: 1,
      };

      checkTags(el);
      calcParameters(el, parameters);
      checkInstallments(el, parameters);
      checkCommission(el, parameters);
    });
  });
});

function calcComissionBase(basePrice, discount) {
  return basePrice - (basePrice * discount) / 2;
}

function checkTags(el) {
  const message =
    "Incorrect tags: 'super okazja' and 'okazja' tags at the same order";
  if (
    el.product.tags.includes("super okazja") &&
    el.product.tags.includes("okazja")
  ) {
    el.rejectionReason = message;
    rejectedOrders.push(el);
    throw new Error(message);
  }
}

function calcParameters(el, parameters) {
  if (
    el.product.tags.some((el) => el === "super okazja") &&
    el.order.userDevice === "mobileApp"
  ) {
    parameters.provision -= 0.05;
    parameters.commissionBase = calcComissionBase(parameters.price, 0.1);
    parameters.price -= 0.1;
  } else if (el.product.tags.some((el) => el === "okazja")) {
    parameters.provision -= 0.02;
    parameters.commissionBase = calcComissionBase(parameters.price, 0.05);
    parameters.price -= 0.05;
  }
}

function checkInstallments(el, parameters) {
  if (el.order.payment.method === "installments") parameters.provision += 0.05;
}

function checkCommission(el, parameters) {
  const message = "Incorrect commission";
  if (
    Math.round(
      el.product.price * parameters.commissionBase * parameters.provision
    ) ===
    el.commission + el.order.shipping.price
  ) {
    el.rejectionReason = message;
    rejectedOrders.push(el);
    throw new Error(message);
  }
}
