class StateMachine {
  constructor() {
    this.sm = [];
    this.currentState = null;
    this.currentTimers = [];
  }

  process(signal) {
    let transition = this.sm.find(
      (item) => item.from === this.currentState && item.by === signal,
    );
    if (!transition) {
      console.error(`No transition from state ${this.currentState} by signal ${signal}`);
      return;
    }

    this.currentState = transition.to;
    this.clearTimers();
    this.processState();
  }

  clearTimers() {
    this.currentTimers.forEach((timer) => clearTimeout(timer));
    this.currentTimers = [];
  }
}

class CoffeeMachine extends StateMachine {
  constructor() {
    super();
    this.ST_WAIT = 'ST_WAIT';
    this.ST_PAYMENT = 'ST_PAYMENT';
    this.ST_PREPARATION = 'ST_PREPARATION';
    this.ST_FINISH = 'ST_FINISH';

    this.SIG_SELECT_DRINK = 'SIG_SELECT_DRINK';
    this.SIG_PAY = 'SIG_PAY';
    this.SIG_PAY_CANCEL = 'SIG_PAY_CANCEL';
    this.SIG_PREPARE = 'SIG_PREPARE';
    this.SIG_TAKE_DRINK = 'SIG_TAKE_DRINK';
    this.SIG_RETURN_CHANGE = 'SIG_RETURN_CHANGE';
    this.SIG_RETURN_CHANGE_FINISH = 'SIG_RETURN_CHANGE_FINISH';
    this.paidAmount = 0;

    this.sm = [
      { from: this.ST_WAIT, by: this.SIG_SELECT_DRINK, to: this.ST_PAYMENT },
      { from: this.ST_PAYMENT, by: this.SIG_PAY, to: this.ST_PREPARATION },
      { from: this.ST_PAYMENT, by: this.SIG_PAY_CANCEL, to: this.ST_WAIT },
      { from: this.ST_PREPARATION, by: this.SIG_PREPARE, to: this.ST_FINISH },
      { from: this.ST_FINISH, by: this.SIG_TAKE_DRINK, to: this.ST_WAIT },
      { from: this.ST_FINISH, by: this.SIG_RETURN_CHANGE, to: this.ST_WAIT },
      { from: this.ST_FINISH, by: this.SIG_RETURN_CHANGE_FINISH, to: this.ST_FINISH },
    ];

    this.currentState = this.ST_WAIT;
    this.selectedDrink = null;
    this.processState();
  }

  processState() {
    let drinkButtons = document.querySelectorAll('.drink-btn');
    let payBtn = document.querySelector('.pay-btn');
    let qrCode = document.querySelector('.qr-code');
    let coin = document.querySelector('.coin');
    let cup = document.querySelector('.cup');
    let changeBtn = document.querySelector('.change-btn');
    let returnedCoin = document.querySelector('.returned-coin');
    let progressBar = document.querySelector('.progress');
    let message = document.querySelector('.message');
    let paidAmountDisplay = document.querySelector('.paid-amount');

    switch (this.currentState) {
      case this.ST_WAIT:
        this.allOff();
        drinkButtons.forEach((btn) => btn.removeAttribute('disabled'));
        changeBtn.removeAttribute('disabled');
        break;

      case this.ST_PAYMENT:
        this.paidAmount = 0;
        this.allOff();
        drinkButtons.forEach((btn) => btn.setAttribute('disabled', 'disabled'));
        changeBtn.setAttribute('disabled', 'disabled');
        payBtn.style.display = 'block';
        qrCode.style.display = 'block';
        coin.style.display = 'block';
        message.innerText = `Выбран напиток: ${this.selectedDrink.name} (${this.selectedDrink.price} тнг)`;
        paidAmountDisplay.innerText = `Внесено: ${this.paidAmount} тнг`;
        this.currentTimers.push(
          setTimeout(() => this.process(this.SIG_PAY_CANCEL), 10000),
        );
        break;

        case this.ST_PREPARATION:
          this.allOff();
          payBtn.style.display = 'none';
          qrCode.style.display = 'none';
          coin.style.display = 'none';
          cup.style.display = 'block';
          progressBar.style.width = '0%';
          message.innerText = `Готовлю ${this.selectedDrink.name}`;
          let progress = 0;
          let interval = setInterval(() => {
            progress += 1;
            progressBar.style.width = `${progress}%`;
            if (progress === 100) {
              clearInterval(interval);
              this.process(this.SIG_PREPARE);
            }
          }, 150);
          break;
  
          case this.ST_FINISH:
            this.allOff();
            cup.style.display = 'block';
            changeBtn.style.display = 'block';
            message.innerText = 'Возьмите ваш напиток и не забудьте сдачу';
            break;
      }
    }
  
    allOff() {
      let payBtn = document.querySelector('.pay-btn');
      let qrCode = document.querySelector('.qr-code');
      let coin = document.querySelector('.coin');
      let cup = document.querySelector('.cup');
      let changeBtn = document.querySelector('.change-btn');
      let returnedCoin = document.querySelector('.returned-coin');
      payBtn.style.display = 'none';
      qrCode.style.display = 'none';
      coin.style.display = 'none';
      cup.style.display = 'none';
      changeBtn.setAttribute('disabled', 'disabled');
      changeBtn.style.backgroundColor = '';
      returnedCoin.style.display = 'none';
    }
  }
  
  let coffeeMachine = new CoffeeMachine();
  
  document.querySelectorAll('.drink-btn').forEach((btn) => {
    btn.onclick = () => {
      coffeeMachine.selectedDrink = {
        name: btn.getAttribute('data-name'),
        price: parseInt(btn.getAttribute('data-price')),
      };
      coffeeMachine.process(coffeeMachine.SIG_SELECT_DRINK);
    };
  });
  
  document.querySelector('.pay-btn').onclick = () => {
    coffeeMachine.paidAmount += 100;
    let paidAmountDisplay = document.querySelector('.paid-amount');
    paidAmountDisplay.innerText = `Внесено: ${coffeeMachine.paidAmount} тнг`;
  
    let qrCode = document.querySelector('.qr-code');
    qrCode.setAttribute('data-amount', coffeeMachine.paidAmount);
  
    if (coffeeMachine.paidAmount >= coffeeMachine.selectedDrink.price) {
      coffeeMachine.process(coffeeMachine.SIG_PAY);
    }
  };
  
  document.querySelector('.coin').onclick = () => {
    coffeeMachine.paidAmount += 100;
    let paidAmountDisplay = document.querySelector('.paid-amount');
    paidAmountDisplay.innerText = `Внесено: ${coffeeMachine.paidAmount} тнг`;
  
    if (coffeeMachine.paidAmount >= coffeeMachine.selectedDrink.price) {
      coffeeMachine.process(coffeeMachine.SIG_PAY);
    }
  };
  
  document.querySelector('.cup').onclick = () => {
    coffeeMachine.process(coffeeMachine.SIG_TAKE_DRINK);
  };
  
  document.querySelector('.change-btn').onclick = () => {
    coffeeMachine.process(coffeeMachine.SIG_RETURN_CHANGE_FINISH);
    let returnedCoin = document.querySelector('.returned-coin');
    returnedCoin.style.display = 'block';
  };

  document.querySelector('.returned-coin').onclick = () => {
    let returnedCoin = document.querySelector('.returned-coin');
    returnedCoin.style.display = 'none';
  };
  
  document.querySelector('.qr-code').onclick = () => {
    coffeeMachine.paidAmount = coffeeMachine.selectedDrink.price;
    let paidAmountDisplay = document.querySelector('.paid-amount');
    paidAmountDisplay.innerText = `Внесено: ${coffeeMachine.paidAmount} тнг`;
  
    if (coffeeMachine.paidAmount >= coffeeMachine.selectedDrink.price) {
      coffeeMachine.process(coffeeMachine.SIG_PAY);
    }
  };