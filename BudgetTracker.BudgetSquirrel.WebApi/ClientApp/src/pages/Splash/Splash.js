import React, { Children } from 'react'
import VerticalPageSection from '../../components/generic/VerticalPageSection/VerticalPageSection'
import './Splash.scss';
import DiagBorder from '../../components/generic/DiagBorder/DiagBorder';
import RouteConstants from '../../RouteConstants';
import Colors from '../../Colors.scss';
import Layout from '../../Layout/Layout';


export default function Splash() {
    function RegisterButton({ extraClasses, children }) {
        let classes = "button button--primary button--wide";
        if (extraClasses) classes += ` ${extraClasses}`;
        return (
            <a class={classes} href={RouteConstants.REGISTER}>{children}</a>
        )
    }

    return (
        <Layout>
            <div class="splash">
                <VerticalPageSection isrootContainsContent={false}>
                    <div class="vert-section__content color-bg__main">
                        <div class="vert-section__column splash__section__content--grow z-6">
                            <h1 class="color-txt__main-dark">
                                Budget Squirrel is a budget management tool
                                designed for both control freeks and the
                                laid back.
                            </h1>
                            <p class="color-txt__main-dark splash__section__content--no-grow">
                                A budget management tool designed for both
                                control freeks and the laid back.
                            </p>
                            <RegisterButton extraClasses={"mt-30p"}>Sign Up</RegisterButton>
                        </div>
                        <div class="vert-section__column splash__section__img promo__img__container">
                            <img class="promo__img--small"></img>
                        </div>
                    </div>
                    <DiagBorder fillInside={Colors.main} fillOutside={Colors.white} borderColor={Colors.mainMedium} />
                </VerticalPageSection>



                <VerticalPageSection>
                    <div class="vert-section__column splash__section__content">
                        <h1>
                            Create budget goals
                        </h1>
                        <p>
                            Set budgets for custom category and track your
                            spending over time.
                        </p>
                        <RegisterButton extraClasses={"mt-2em"}>Sign Up</RegisterButton>
                    </div>
                    <div class="vert-section__column splash__section__img promo__img__container">
                        <img class="promo__img"></img>
                    </div>
                </VerticalPageSection>



                <VerticalPageSection>
                    <div class="vert-section__column splash__section__img promo__img__container">
                        <img class="promo__img"></img>
                    </div>
                    <div class="vert-section__column splash__section__content">
                        <h1>
                            Track your goals
                        </h1>
                        <p>
                            Create spending periods for custom categories
                            and check your performance.
                        </p>
                        <RegisterButton extraClasses={"mt-2em"}>Sign Up</RegisterButton>
                    </div>
                </VerticalPageSection>



                <VerticalPageSection>
                    <div class="splash__secondary-promo">
                        <img></img>
                        <p>100% Free to Use</p>
                        <p>
                            Budget Squirrel is free to use,
                            No trials and no fees
                        </p>
                    </div>
                    <div class="splash__secondary-promo">
                        <img></img>
                        <p>Budgeting on the go</p>
                        <p>
                            Budget Squirrel is available for
                            both mobile and desktop
                        </p>
                    </div>
                    <div class="splash__secondary-promo">
                        <img></img>
                        <p>Keep updated</p>
                        <p>
                            Enable email notifications to
                            remind yourself
                        </p>
                    </div>
                </VerticalPageSection>

                <VerticalPageSection isrootContainsContent={false}>
                    <div class="vert-section__content vert-section__content--no-side-margins vert-section__content--no-height-padding splash__register-section">
                        <p class="z-1">Get nuts about your budget</p>
                        <RegisterButton extraClasses={"z-1"}>Get Started</RegisterButton>
                    </div>
                    <div class="splash__register-section-background">
                        <svg class="splash__register-section-background-svg"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 100 40"
                            preserveAspectRatio="none">
                            <polygon class="color-wash-bg--dark" points="0 30, 100 10, 100 40, 0 40" />
                            <polygon class="color-wash-bg--light" points="0 5, 100 20, 100 40, 0 40" />
                        </svg>
                    </div>
                </VerticalPageSection>
            </div>
        </Layout>
    )
}
