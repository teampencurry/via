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
    paper.addEventListener('pointermove', (e) => {
      e.preventDefault();
      if (!this.rotating) {
        this.touchMoveX = e.clientX || e.touches[0].clientX;
        this.touchMoveY = e.clientY || e.touches[0].clientY;

        this.velX = this.touchMoveX - this.prevTouchX;
        this.velY = this.touchMoveY - this.prevTouchY;

        if (this.holdingPaper) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }

        this.prevTouchX = this.touchMoveX;
        this.prevTouchY = this.touchMoveY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    });

    paper.addEventListener('pointerdown', (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      paper.style.zIndex = highestZ;
      highestZ += 1;

      this.touchStartX = e.clientX || e.touches[0].clientX;
      this.touchStartY = e.clientY || e.touches[0].clientY;
      this.prevTouchX = this.touchStartX;
      this.prevTouchY = this.touchStartY;
    });

    paper.addEventListener('pointerup', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });

    paper.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.rotating = true;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
