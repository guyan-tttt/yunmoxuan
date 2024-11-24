import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '⚡ 简介',
    Svg: require('@site/static/img/introduce.svg').default,
    description: (
      <>
       云墨轩是一一款个人博客管理系统，包含后台管理,前台和小程序展示三个部分。前台展示部分名为<strong>云墨轩</strong>，后台管理部分名为<strong>极客空间</strong>。
      </>
    ),
  },
  {
    title: '🔥 技术栈',
    Svg: require('@site/static/img/tool.svg').default,
    description: (
      <>
    <strong>前端</strong>采用当前最流行的<strong>Vue3,TypeScript,Element Plus,Pinia, Uniapp</strong> 等主要技术，并使用Vite进行构建。
    <strong>后端</strong>采用当前前端开发和最易学习的技术Node.js最流行的框架<strong>Express</strong>开发，数据库层面采用了对JavaScript非常友好的<strong>MongoDB</strong>数据库。
      </>
    ),
  },
  {
    title: '✨ 特点',
    Svg: require('@site/static/img/property.svg').default,
    description: (
      <>
         <strong>非常简洁</strong>没有复杂的封装，没有复杂的类型体操，开箱即用 <br />
         <strong>详细的注释</strong>各个配置项都写有尽可能详细的注释<br />
         <strong>有点规整</strong>:代码风格统一，命名风格统一，注释风格统一v
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
