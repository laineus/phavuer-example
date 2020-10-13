import config from '../data/config'
export const overScreen = (object, padding = 0) => {
  return object.x < -padding || object.x > config.WIDTH + padding || object.y < -padding || object.y > config.HEIGHT + padding 
}
