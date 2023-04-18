class Logger {
  static ERROR = 0;
  static INFO = 1;
  static WARNING = 2;
  static DEBUG = 3;
  static TRACE = 4;

  constructor(logLevel, logElementId) {
    this.level = logLevel;
    this.logElement = logElementId ? document.getElementById(logElementId) : null;
  }

  _log(level, message) {
    if (this.level >= level) {
      const levelNames = ['E', 'I', 'W', 'D', 'T'];
      const now = new Date();
      const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;
      const formattedMessage = `[${levelNames[level]}]  ${time}  ${message}`;

      console.log(formattedMessage);

      if (this.logElement) {
        const logLine = document.createElement('div');
        logLine.className = levelNames[level].toLowerCase();
        logLine.textContent = formattedMessage;
        this.logElement.appendChild(logLine);
      }
    }
  }

    e(message) { this._log(Logger.ERROR, message); }
    i(message) { this._log(Logger.INFO, message); }
    w(message) { this._log(Logger.WARNING, message); }
    d(message) { this._log(Logger.DEBUG, message); }
    t(message) { this._log(Logger.TRACE, message); }
}

const log = new Logger(Logger.DEBUG, 'log-area');
log.w("Это warning сообщение");
log.t("Это trace сообщение");
log.e("Это error сообщение");

let btn = document.getElementById('button');

btn.onclick = ev => {
    log.i("Кнопка нажата");
    let newColor = prompt('Введите цвет');
    log.d(`Введенный цвет: ${newColor}`);
    let myList = document.querySelectorAll('li');
    log.d(`Список элементов: ${myList}`);
    for (let i = 0; i < myList.length; i++) {
        log.t(`Индекс: ${i}, элемент: ${myList[i]}`);
        myList[i].style.backgroundColor = newColor;
    }
};