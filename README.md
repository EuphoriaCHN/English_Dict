# My English Dictionary

<p align="center">
  <a href="javascript:void(0)">
    <img
      alt="Euphoria Blog"
      src="https://qlogo4.store.qq.com/qzone/879969355/879969355/100?1491838236"
      style="width: 100px; border-radius: 50%;"
    />
  </a>
</p>

## Clone 

```shell
git clone https://github.com/EuphoriaCHN/English_Dict.git
cd ./English_Dict
```

## Install Dependencies

```shell
npm config set registry https://registry.npm.taobao.org/
npm install -g yarn
yarn deps
```

## Development

```shell
yarn dev
```

### i18n

```shell
yarn i18n
```

#### Add new source language to project

Edit `/scripts/i18n/index.js` to add new language:

```javascript
// Line 9
const LANGS = ['zh-CN', 'en-US', /* New language */];
```

Edit `/client/src/components/LanguageSelector/index.tsx` to ensure ensure the normal display of the frontend. 

```typescript
// Line 19
const languages: { [k: string]: string } = React.useMemo(() => ({
    'zh-cn': '简体中文',
    'en-us': 'English',
    /* New language */
}), []);
```

Finally, run `i18n` scripts again to generate i18n static locale:

```shell
yarn i18n
```

#### About MomentJS

Frontend project used [MomentJS Webpack Plugin](https://www.npmjs.com/package/moment-locales-webpack-plugin) for optimizing. More details see `/client/.umirc.ts` **chainWebpack** configurations:

```typescript
chainWebpack(chain) {
  chain.plugin('moment-js-webpack-plugin').use(new MomentLocalesPlugin({
      localesToKeep: ['en', 'zh-cn']
  }));
}
```

## Deployment

> Stay tuned...
