"use client";

import { useEffect, useState } from "react";
import { useDesktopStore } from "@/store/desktopStore";

const videoList = [
	"/videos/one.mp4",
	"/videos/two.mp4",
	"/videos/three.mp4",
];

export default function Doom() {
	const selectedVideo = useDesktopStore((state) => state.selectedVideo);

	const [currentIndex, setCurrentIndex] = useState(() => {
		if (!selectedVideo) return 0;

		const index = videoList.indexOf(selectedVideo.path || "");
		return index >= 0 ? index : 0;
	});

	useEffect(() => {
		if (!selectedVideo) return;

		const index = videoList.indexOf(selectedVideo.path || "");
		if (index >= 0) {
			setCurrentIndex(index);
		}
	}, [selectedVideo, selectedVideo?.path]);

	const [isMuted, setIsMuted] = useState(false);

	const goToVideo = (direction: -1 | 1) => {
		setCurrentIndex((prev) => {
			return (prev + direction + videoList.length) % videoList.length;
		});
	};

	const currentVideo = videoList[currentIndex];

	return (
		<div className="h-full w-full overflow-hidden text-white">
			<div className="relative h-full bg-black">

				<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_40%)]" />
				<div className="absolute inset-0 bg-black/75" />

				<div className="
					absolute
					inset-x-0
					top-4
					flex
					items-center
					justify-between
					px-4
				">

					<div className="
						rounded-full
						border
						border-white/10
						bg-white/10
						px-3
						py-2
						text-xs
						uppercase
						tracking-[0.35em]
						text-white/70
						backdrop-blur-xl
					">
						OceanOS TikTok Clips
					</div>

					<div className="
						rounded-full
						border
						border-white/10
						bg-white/10
						px-3
						py-2
						text-xs
						text-white/70
						backdrop-blur-xl
					">
						{currentIndex + 1}/{videoList.length}
					</div>

				</div>


				<div className="
					absolute
					inset-x-6
					inset-y-16
					rounded-[40px]
					border
					border-white/10
					bg-black/60
					shadow-2xl
					overflow-hidden
				">

					<video
						key={currentVideo}
						src={currentVideo}
						autoPlay
						loop
						muted={isMuted}
						playsInline
						className="
							h-full
							w-full
							object-cover
						"
					/>

					<div className="
						absolute
						inset-0
						bg-gradient-to-t
						from-black/95
						via-transparent
						to-black/40
					"/>


					<div className="
						absolute
						inset-x-0
						bottom-0
						p-6
					">

						<div className="
							rounded-3xl
							border
							border-white/10
							bg-black/60
							p-4
							backdrop-blur-xl
						">

							<p className="text-white/80">
								@Jokester131🤣
							</p>

							<p className="
								mt-2
								text-lg
								font-semibold
							">
								OceanOS #doomsday #tiktok #😂
							</p>

						</div>

					</div>

				</div>


				<div className="
					absolute
					right-6
					top-1/2
					flex
					w-12
					-translate-y-1/2
					flex-col
					items-center
					gap-4
				">

					<button
						onClick={() => setIsMuted((prev) => !prev)}
						className="
							h-12
							w-12
							rounded-3xl
							border
							border-white/10
							bg-white/10
							backdrop-blur-xl
							transition
							hover:bg-white/20
						"
					>
						{isMuted ? "🔈" : "🔊"}
					</button>


					<button className="
						h-12
						w-12
						rounded-3xl
						border
						border-white/10
						bg-white/10
						backdrop-blur-xl
					">
						♡
					</button>


					<button className="
						h-12
						w-12
						rounded-3xl
						border
						border-white/10
						bg-white/10
						backdrop-blur-xl
					">
						↻
					</button>


					<button className="
						h-12
						w-12
						rounded-3xl
						border
						border-white/10
						bg-white/10
						backdrop-blur-xl
					">
						💬
					</button>


					<button className="
						h-12
						w-12
						rounded-3xl
						border
						border-white/10
						bg-white/10
						backdrop-blur-xl
					">
						⤴
					</button>


					<button
						onClick={() => goToVideo(-1)}
						className="
							h-12
							w-12
							rounded-3xl
							border
							border-white/10
							bg-white/10
							backdrop-blur-xl
						"
					>
						↑
					</button>


					<button
						onClick={() => goToVideo(1)}
						className="
							h-12
							w-12
							rounded-3xl
							border
							border-white/10
							bg-white/10
							backdrop-blur-xl
						"
					>
						↓
					</button>

				</div>

			</div>
		</div>
	);
}