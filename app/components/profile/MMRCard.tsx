interface Props {
    data: {
        min: number;
        max: number;
        average: number;
        rankPrediction: string;
        trend: "RISING" | "STABLE" | "FALLING";
        confidence: number;
    };
}


export default function MMRCard({
    data
}: Props) {


    const trendStyle = {

        RISING: "text-green-400",
        STABLE: "text-yellow-400",
        FALLING: "text-red-400"

    };


    const trendIcon = {

        RISING: "↗",
        STABLE: "→",
        FALLING: "↘"

    };

    const gaugePosition =
        Math.min(
            95,
            Math.max(
                5,
                ((data.average - 1000) / 700) * 100
            )
        );


    return (

        <section className="
      rounded-3xl
      border
      border-zinc-800
      bg-zinc-900/70
      p-8
      backdrop-blur-xl
    ">


            <h2 className="
        mb-6
        text-3xl
        font-black
      ">
                🧠 Estimated MMR
            </h2>


            <div className="
        flex
        flex-col
        gap-6
      ">


                <div>

                    <p className="
 text-5xl
 font-black
">
                        {data.min} - {data.max}
                    </p>


                    <p className="
 mt-2
 text-zinc-400
">
                        Most likely:
                    </p>


                    <p className="
 text-xl
 font-bold
 text-red-400
">
                        {data.rankPrediction}
                    </p>

                    <div className="mt-8">

                        <div className="
    flex
    justify-between
    text-xs
    text-zinc-500
    mb-3
  ">
                            <span>Silver</span>
                            <span>Gold</span>
                            <span>Platinum</span>
                            <span>Emerald</span>
                        </div>


                        <div className="
    relative
    h-3
    rounded-full
    bg-zinc-800
    overflow-hidden
  ">

                            <div
                                className="
        absolute
        inset-y-0
        left-0
        rounded-full
        bg-red-500/70
      "
                                style={{
                                    width: `${gaugePosition}%`
                                }}
                            />


                            <div
                                className="
        absolute
        top-1/2
        h-5
        w-5
        -translate-y-1/2
        rounded-full
        border-2
        border-white
        bg-red-500
      "
                                style={{
                                    left: `${gaugePosition}%`
                                }}
                            />

                        </div>

                    </div>


                    <p className="
            mt-2
            text-zinc-400
          ">
                        Estimated Rating
                    </p>

                </div>



                <div>

                    <p className="
            text-sm
            text-zinc-400
          ">
                        Current Trend
                    </p>


                    <p className={`
            mt-1
            text-xl
            font-bold
            ${trendStyle[data.trend]}
          `}>
                        {trendIcon[data.trend]} {data.trend}
                    </p>

                </div>



                <div>

                    <div className="
            flex
            justify-between
            text-sm
            text-zinc-400
          ">
                        <span>
                            Confidence
                        </span>

                        <span>
                            {data.confidence}%
                        </span>

                    </div>


                    <div className="
            mt-2
            h-3
            overflow-hidden
            rounded-full
            bg-zinc-800
          ">

                        <div
                            className="
                h-full
                rounded-full
                bg-red-500
              "
                            style={{
                                width: `${data.confidence}%`
                            }}
                        />

                    </div>


                </div>


            </div>


        </section>

    );

}