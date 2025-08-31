export default {
 getMatchScoreColor : (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  },

 getMatchScoreLabel : (score) => {
    if (score >= 90) return 'Hight';
    if (score >= 80) return 'Normal';
    return 'Lower';
  }
}