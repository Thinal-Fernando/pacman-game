class pacman {
    constructor(x, y, width, height, speed) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = speed
        this.direction = direction_right
        this.currentFrame = 1
        this.frameCount = 7

        setInterval(() => {
            this.changeAnimation()
        }, 100)
    }


    moveForwards() {
        switch (this.direction) {
            case direction_up:
                this.y += this.speed
                break
            case direction_down:
                this.y -= this.speed
                break
            case direction_left:
                this.x -= this.speed
                break
            case direction_right:
                this.x += this.speed
                break
        }

    }


    checkWallCollision() {
        let isCollided = false
        if (
            map[this.getMapY()][this.getMapX()] === 1 ||
            map[this.getMapXRightSide()][this.getMapXRightSide()] === 1 ||
            map[this.getMapY()][this.getMapXRightSide()] === 1 ||
            map[this.getMapYRightSide()][this.getMapX()] === 1
        ) {
            return true;
        }

        return false

    }

    changeAnimation() {
        if (this.currentFrame < this.frameCount) {
            this.currentFrame += 1;
        } else {
            this.currentFrame = 1;
        }
    }

    //Returns pac mans current x posision in the map grid.
    getMapX() {
        return Math.floor(this.x / oneBlockSize);
    }

    //Returns pac mans current y posision in the map grid.
    getMapY() {
        return Math.floor(this.y / oneBlockSize);
    }

    // Returns the X position of pacmans right edge in the map grid
    getMapXRightSide() {
        return Math.floor((this.x + this.width - 1) / oneBlockSize)
    }

    // Returns the Y position of pacmans bottom edge in the map grid
    getMapYRightSide() {
        return Math.floor((this.y + this.height - 1) / oneBlockSize);

    }


}