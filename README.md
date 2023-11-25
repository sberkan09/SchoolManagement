# SchoolManagement
## Kurulum
node.js version 18 or higher


Sadece başlangıçta ya da `package.json` güncellendiğinde
```
$ npm i pkg.json
```
komutunu çalıştırın.


## Çalıştırma

```
$ npm run dev
```

## Git
### `main` branch üzerinde çalışma
Kod üzerinde çalışmanız bittiğinde

```
git add <file name>
git commit -m <commit message>
git pull
git push
```
komutlarını çalıştırın. Yüklediğiniz kodda çakışma olmadığına dikkat edin.

### Farklı branch üzerinde çalışma
Güncellemeleri `main`'den farklı branch üzerinde yapacaksanız, öncelikle
```
git branch <branch-name>
git checkout <branch-name>
```
komutlarını çalıştırın.

Github'a yükleyeceğiniz zaman
```
git add <file name>
git commit -m <commit message>
git pull
git push --set-upstream origin <branch-name>
```
komutlarını çalıştırın. `<branch-name>`'den `main`'e merge etmeyi unutmayın.
Merge için
1. Github `Pull requests` sekmesinden `New pull request`'e tıklayın.
1. Çalıştığınız branch'i seçin.
1. Açılan `Comparing Changes` ekranından değişikliklerinizi kontrol edin.
1. `Create pull request`'e tıklayın.
1. `Title` ve `Description` girin, ardından `Create pull request`'e tıklayın.
1. `Pull requests` sekmesinden PR seçip merge'leyin.

## Deploy
Github `main` branch üzerindeki kod her merge'den sonra otomatik olarak build edilip aşağıdaki websitesinde sergilenmektedir.
> https://school-management-pied.vercel.app/
