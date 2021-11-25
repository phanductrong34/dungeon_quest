import Sprite from "./Sprite";

// input {x, y}
class GameObject {
    constructor(config){
        this.isMounted = false;
        this.name = config.spriteName;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = "down";
        this.sprite = new Sprite({
            gameObject : this,
            spriteName: config.spriteName || 'hero'
        });
    }

    get isMonster(){
        if(this.name == 'redMon' || this.name == 'greenMon' || this.name == "whiteMon") return true;
        else return false;
    }
    get isSword(){
        if(this.name == 'sword') return true;
        else return false;
    }
    get isGoal(){
        if(this.name == 'goal') return true;
        else return false;
    }

    mount(map){
        this.isMounted = true;
        if(!this.isMonster && !this.isSword && !this.isGoal){
            map.addWall(this.x, this.y);

        }else if(this.isSword){
            map.addSword(this.x, this.y,this);
        }else if(this.isGoal){
            map.addGoal(this.x, this.y);                                         
        }else{
            map.addMonsterAndTrap(this.x,this.y,this);
        }
        
    }
    update(){
        
    }
}

export default GameObject;