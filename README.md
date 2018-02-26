### arrow function 使用

  不可使用箭頭函式的情況
  
    1. 用物件字面文字定義物件時，物件中的方法

    因為箭頭函式會以物件在定義時的捕捉到的週邊this為預設this，也就是window或全域物件(或是在嚴格模式的undefined)。所以會造成是存取不到物件中的array屬性值。
  ``` javascript
      const calculate = {
        array: [1, 2, 3],
        sum: () => {
          return this.array.reduce((result, item) => result + item)
        }
      }
  

    //錯誤: TypeError: Cannot read property 'array' of undefined

    calculate.sum()
  ```
    在物件的prototype屬性中定義的方法
    這種情況與上面一點類似，箭頭函式的this值這時會是window或全域物件(或是在嚴格模式的undefined)。
  ``` javascript
      function MyCat(name) {
        this.catName = name
      }

      MyCat.prototype.sayCatName = () => {
        return this.catName
      }

      cat = new MyCat('Mew')

      cat.sayCatName() // undefined
  ```
    2. DOM事件處理的監聽者(事件處理函式)

    箭頭函式的this值，相當於window或全域物件(或是在嚴格模式的undefined)。這裡的this值如果用一般函式定義的寫法，正確應該是要對應到被監聽DOM元素本身。

  ``` javascript
      const button = document.getElementById('myButton')

      button.addEventListener('click', () => {
        this.innerHTML = 'Clicked button'
      })
  ```

    3. 建構函式
    
    箭頭函式沒有constructor這個設計(原本的函式中有)，直接使用new運算符時會拋出例外產生錯誤。

  ``` javascript
      const Message = (text) => {
        this.text = text
      }
  

    // 錯誤 Throws "TypeError: Message is not a constructor"

    const helloMessage = new Message('Hello World!');
  ```

    4. 其他注意的限制或陷阱

    函式物件中的call、apply、bind三個方法，無法"覆蓋"箭頭函式中的this值。
    箭頭函式沒有原本(傳統)的函式有的隱藏arguments物件。
    箭頭函式不能當作generators使用，使用yield會產生錯誤。
    在一些函式庫像jQuery、underscore函式庫有些有使用callback(回調, 回呼)的API中不一定可以用。

[以上資料 參考 ES6 篇 - Arrow Function(箭頭函式)](https://ithelp.ithome.com.tw/articles/10185221) 

### Weather API website

  [Forecast io. : https://darksky.net](https://darksky.net/forecast)

#### git Initialize

    > git init

    > git status -> see files Status

    > git add package.json -> add files to git

    > git commit -m 'update message you defined' -> commit to git

    > git push -> * push files to git

#### ssh github

##### Terminal Create SSH Keys

    ls -al ~/.ssh -> show ssh key info

    ssh-keygen -t rsa -b 4096 -C 'your mail address' -> sign ssh keys

    eval "$(ssh-agent -s)" -> show agent pid

    ssh-add ~/.ssh/id_rsa -> Identity added: /Users/xxx/.ssh/id_rsa (/Users/xxx/.ssh/id_rsa)

##### Login to your github account

  [Adding a new SSH key to your GitHub account](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/)

    go to https://github.com/settings/keys

    create new ssh key

    > pbcopy < ~/.ssh/id_rsa.pub -> generate key

    paste to 'key' content after run above command

    > ssh -T git@github.com -> view git account for use

##### create repos

    create New repository

  [GitHub Index Page](https://github.com/)

    owner / 'press repository name' > create

    …or push an existing repository from the command line

      git remote add origin https://github.com/xxx/your-project.git
    
      git push -u origin master

##### Heroku Settings

    Heroku Website
    
  [Heroku Login](https://dashboard.heroku.com/)

    Toolbelt Install

  [Download toolbelt with CLI](https://blog.heroku.com/the_heroku_toolbelt)

    See Helper > heroku --help

    login Heroku > heroku login 

    add keys to heroku > heroku keys:add

    check keys existed > heroku keys

    > ssh -v git@heroku.com

    > heroku create

    > git push heroku

##### thanks for references
  [Resource and note refs by Andrew Mead](https://github.com/andrewjmead)