document.addEventListener('DOMContentLoaded', () => {
    let highestZ = 1;
  
    class Paper {
      holdingPaper = false;
      touchStartX = 0;
      touchStartY = 0;
      touchMoveX = 0;
      touchMoveY = 0;
      prevTouchX = 0;
      prevTouchY = 0;
      velX = 0;
      velY = 0;
      rotation = Math.random() * 30 - 15;
      currentPaperX = 0;
      currentPaperY = 0;
      rotating = false;
  
      init(paper) {
        const isTouchDevice = 'ontouchstart' in window;
  
        const startEvent = isTouchDevice ? 'touchstart' : 'mousedown';
        const moveEvent = isTouchDevice ? 'touchmove' : 'mousemove';
        const endEvent = isTouchDevice ? 'touchend' : 'mouseup';
  
        paper.addEventListener(moveEvent, (e) => {
          e.preventDefault();
          if (!this.rotating) {
            this.touchMoveX = isTouchDevice ? e.touches[0].clientX : e.clientX;
            this.touchMoveY = isTouchDevice ? e.touches[0].clientY : e.clientY;
  
            this.velX = this.touchMoveX - this.prevTouchX;
            this.velY = this.touchMoveY - this.prevTouchY;
          }
  
          const dirX = this.touchMoveX - this.touchStartX;
          const dirY = this.touchMoveY - this.touchStartY;
          const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
          const dirNormalizedX = dirX / dirLength;
          const dirNormalizedY = dirY / dirLength;
  
          const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
          let degrees = (180 * angle) / Math.PI;
          degrees = (360 + Math.round(degrees)) % 360;
          if (this.rotating) {
            this.rotation = degrees;
          }
  
          if (this.holdingPaper) {
            if (!this.rotating) {
              this.currentPaperX += this.velX;
              this.currentPaperY += this.velY;
            }
            this.prevTouchX = this.touchMoveX;
            this.prevTouchY = this.touchMoveY;
  
            paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
          }
        });
  
        paper.addEventListener(startEvent, (e) => {
          if (this.holdingPaper) return;
          this.holdingPaper = true;
  
          paper.style.zIndex = highestZ;
          highestZ += 1;
  
          if (isTouchDevice) {
            this.touchStartX = e.touches[0].clientX;
            this.touchStartY = e.touches[0].clientY;
            this.prevTouchX = this.touchStartX;
            this.prevTouchY = this.touchStartY;
          } else {
            this.prevTouchX = e.clientX;
            this.prevTouchY = e.clientY;
          }
        });
  
        window.addEventListener(endEvent, () => {
          this.holdingPaper = false;
          this.rotating = false;
        });
  
        if (isTouchDevice) {
          paper.addEventListener('gesturestart', (e) => {
            e.preventDefault();
            this.rotating = true;
          });
          paper.addEventListener('gestureend', () => {
            this.rotating = false;
          });
        }
      }
    }
  
    const papers = Array.from(document.querySelectorAll('.paper'));
  
    papers.forEach(paper => {
      const p = new Paper();
      p.init(paper);
    });
  });
