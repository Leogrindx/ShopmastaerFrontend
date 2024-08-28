import React from "react";
import s from "./Footer.module.scss";
import classNames from "classnames";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/img/fon_footer.jpg)`,
      }}
    >
      <div className={classNames(s.support, s.flex_colum)}>
        <h3>SUPPORT</h3>
        <div className={s.block_footer}>
          <div className={s.block_partition_footer}>
            <a href="/">CUSTOMER SERVICE</a>
            <div className={s.partition_footer}></div>
          </div>
        </div>
        <div className={s.block_footer}>
          <div className={s.block_partition_footer}>
            <a href="/">SIZE GUIDE</a>
            <div className={s.partition_footer}></div>
          </div>
        </div>
        <div className={s.block_footer}>
          <div className={s.block_partition_footer}>
            <a href="/">PRODUCT CARE</a>
            <div className={s.partition_footer}></div>
          </div>
        </div>
        <div className={s.block_footer}>
          <div className={s.block_partition_footer}>
            <a href="/">RETURNS {"&"} REFUNDS</a>
            <div className={s.partition_footer}></div>
          </div>
        </div>
        <div className={s.block_footer}>
          <div className={s.block_partition_footer}>
            <a href="/">WARRANTY {"&"} REPAIR POLICY</a>
            <div className={s.partition_footer}></div>
          </div>
        </div>
        <div className={s.block_footer}>
          <div className={s.block_partition_footer}>
            <a href="/">GUEST ORDER SUMMARY</a>
            <div className={s.partition_footer}></div>
          </div>
        </div>
        <div className={s.block_footer}>
          <div className={s.block_partition_footer}>
            <a href="/">SHOP MASTER PL</a>
            <div className={s.partition_footer}></div>
          </div>
        </div>
      </div>
      <div className={classNames(s.corporate, s.flex_colum)}>
        <h3>CORPORATE</h3>
        <div className={s.block_footer}>
          <div className={s.block_partition_footer}>
            <a href="/">SHOP MASTER CUSTOM GEAR</a>
            <div className={s.partition_footer}></div>
          </div>
        </div>
        <div className={s.block_footer}>
          <div className={s.block_partition_footer}>
            <a href="/">CAREERS</a>
            <div className={s.partition_footer}></div>
          </div>
        </div>
        <div className={s.block_footer}>
          <div className={s.block_partition_footer}>
            <a href="/">BECOME A DEALER</a>
            <div className={s.partition_footer}></div>
          </div>
        </div>
        <div className={s.block_footer}>
          <div className={s.block_partition_footer}>
            <a href="/">CONTACT US</a>
            <div className={s.partition_footer}></div>
          </div>
        </div>
        <div className={s.block_footer}>
          <div className={s.block_partition_footer}>
            <a href="/">PRIVACY POLICY</a>
            <div className={s.partition_footer}></div>
          </div>
        </div>
        <div className={s.block_footer}>
          <div className={s.block_partition_footer}>
            <a href="/">TERMS {"&"} CONDITIONS</a>
            <div className={s.partition_footer}></div>
          </div>
        </div>
        <div className={s.block_footer}>
          <div className={s.block_partition_footer}>
            <a href="/">SITEMAP</a>
            <div className={s.partition_footer}></div>
          </div>
        </div>
      </div>
      <div className={s.subscribe}>
        <form action="/" method="post">
          <h3>PLEASE SUBSCRIBE TO OUR NEWSLETTER</h3>
          <input type="email" name="email" />
          <button type="submit">Sign up</button>
        </form>
        <div className={s.social}>
          <a href="/">
            <img
              src={`${process.env.PUBLIC_URL}/img/facebook.png`}
              alt="facebook"
            />
          </a>
          <a href="/">
            <img
              src={`${process.env.PUBLIC_URL}/img/youtube.png`}
              alt="youtube"
            />
          </a>
          <a href="/">
            <img
              src={`${process.env.PUBLIC_URL}/img/instagram.png`}
              alt="instagram"
            />
          </a>
          <a href="/">
            <img
              src={`${process.env.PUBLIC_URL}/img/twitter.png`}
              alt="twitter"
            />
          </a>
        </div>
      </div>
      <div className="bottom">©Shop Master</div>
    </footer>
  );
};

export default Footer;
