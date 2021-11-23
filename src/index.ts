import './style/index.less';
import Food from './modules/Food';
import GameControl from './modules/gameControl';

const food = new Food();
food.change();
console.log(food.X, food.Y);

const gc = new GameControl();




