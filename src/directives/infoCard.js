function infoCard() {
  return {
    restrict: 'EA',
    replace: true,
    templateUrl: './views/directives/infoCard.html',
    scope: {
      name: '=',
      points: '='
    }
  };
}

export default infoCard;
