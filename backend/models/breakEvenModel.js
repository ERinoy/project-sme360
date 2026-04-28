const BreakEven = {
    calculate: (fixedCost, sellingPrice, variableCost) => {
        const contributionMargin = sellingPrice - variableCost;

        if (contributionMargin <= 0) {
            throw new Error("Selling price must be greater than variable cost");
        }

        const breakEvenUnits = fixedCost / contributionMargin;
        const breakEvenRevenue = breakEvenUnits * sellingPrice;

        return {
            fixedCost,
            sellingPrice,
            variableCost,
            contributionMargin,
            breakEvenUnits: Math.ceil(breakEvenUnits),
            breakEvenRevenue: Number(breakEvenRevenue.toFixed(2))
        };
    }
};

module.exports = BreakEven;