/**
 * 
 * @param {Number} amount Amount to display.
 * @returns Amount to display.
 */
export function printAmount(amount = 0){
    amount = Number.parseFloat(amount);
    return '$' + amount.toFixed(2);
}