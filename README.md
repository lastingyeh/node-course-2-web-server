### Weather API website

[Forecast io. : https://darksky.net](https://darksky.net/forecast)

---

### Git 使用

   git init to project

    $ git init

  show git files status

    $ git status 

  add files to git

    $ git add package.json 

  commit & updated to git

    $ git commit -m 'update message you defined'

  push files to git  

    $ git push

---

### SSH Created By Github

  show ssh key info

    $ ls -al ~/.ssh

  sign ssh keys

    $ssh-keygen -t rsa -b 4096 -C [your mail address]

  show agent pid

    $ eval "$(ssh-agent -s)"

  Identity added: /Users/xxx/.ssh/id_rsa (/Users/xxx/.ssh/id_rsa)

    $ ssh-add ~/.ssh/id_rsa

* [login to github & Adding a new SSH key to your GitHub account](https://help.github.com/articles/adding-a-new-ssh-key-to-your-github-account/)

* [go to githubkeys website & create new ssh key](https://github.com/settings/keys)

* generate key

      $ pbcopy < ~/.ssh/id_rsa.pub

* paste to 'key' content after run above command,  view git account for use

      $ ssh -T git@github.com

---

### create repos (create New repository)

  [GitHub Index Page](https://github.com/)

  * owner / 'press repository name' > create

  * …or push an existing repository from the command line
  
  
        $ git remote add origin https://github.com/xxx/your-project.git
    
        $ git push -u origin master

---

### [Heroku Settings](https://dashboard.heroku.com/)

* [Download toolbelt with CLI](https://blog.heroku.com/the_heroku_toolbelt)

  See Helper 
    
      $ heroku --help

  login Heroku 
  
      $ heroku login 

  add keys to heroku 
  
      $ heroku keys:add

  check keys existed 
  
      $ heroku keys

      $ ssh -v git@heroku.com

      $ heroku create

      $ git push heroku

---

#### Heroku Set Config Env

  get configs

    $ heroku config

  get config by name

    $ heroku config:get [name]

  set config by key-value

    $ heroku config:set [name]=[value]

  delete config by name

    $ heroku config:unset [name]

---

### MongoDB Notes

  1. local run mongodb

      start db service

          $ mongod --dbpath ~/[mongo-data] 

  2. entry to db

          $ mongo

---

### MongoDB Native Notes

1. connection DB (mongodb-db.js)

    use async/await to generate promise connection

2. insert (mongodb-insert.js)

    async/await with callback func to create doc

3. find

    find() & findOne({...}) & findOne({_id:new ObjectId('xxx')})

4. delete [refs](https://stackoverflow.com/questions/42715591/mongodb-difference-remove-vs-findoneanddelete-vs-deleteone)

    deleteMany() & deleteOne() & findOneAndDelete()

5. update

    findOneAndUpdate & $inc, $set used.

---

### 其他補充

#### arrow function (不可使用箭頭函式的情況) 

1. 用物件字面文字定義物件時，物件中的方法

    因為箭頭函式會以物件在定義時的捕捉到的週邊this為預設this，也就是window或全域物件(或是在嚴格模式的undefined)。所以會造成是存取不到物件中的array屬性值。

    ``` javascript
    const calculate = {
        array: [1, 2, 3],
        
        sum: () => {
          return this.array.reduce((result, item) =>  result + item)
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

5. 參考資料

    [iT邦幫忙 Modern Web React-DOM界的彼方系列 ES6篇 Arrow Function(箭頭函式)](https://ithelp.ithome.com.tw/articles/10185221) 

--- 

### 參考資料
[Andrew Mead GitHub](https://github.com/andrewjmead)