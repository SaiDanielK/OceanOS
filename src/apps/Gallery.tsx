"use client";

import { useEffect, useState } from "react";
import { usePhotoStore } from "@/store/photoStore";
import { useDesktopStore } from "@/store/desktopStore";

export const images = [
	{
		title: "Beach",
		src: "/gallery/beach.jpg",
		camera: false,
	},
	{
		title: "City",
		src: "/gallery/city.jpg",
		camera: false,
	},
	{
		title: "Forest",
		src: "/gallery/forest.jpg",
		camera: false,
	},
	{
		title: "Mountain",
		src: "/gallery/mountain.jpg",
		camera: false,
	},
	{
		title: "Ocean",
		src: "/gallery/ocean.jpg",
		camera: false,
	},
	{
		title: "Sunset",
		src: "/gallery/sunset.jpg",
		camera: false,
	},
];

type GalleryPhoto = {
	id?: number;
	title: string;
	src: string;
	camera: boolean;
};

export default function Gallery() {
	const photos = usePhotoStore((state) => state.photos);
	const removePhoto = usePhotoStore((state) => state.removePhoto);

	const selectedImage = useDesktopStore((state) => state.selectedImage);

	const [selectedPhoto, setSelectedPhoto] =
		useState<GalleryPhoto | null>(() => {
			if (!selectedImage) return null;

			const foundImage = images.find(
				(image) => image.src === selectedImage.path
			);

			return foundImage ?? null;
		});

	useEffect(() => {
		if (!selectedImage) {
			return;
		}

		const foundImage = images.find(
			(image) => image.src === selectedImage.path
		);
		if (foundImage) {
			setSelectedPhoto(foundImage);
		}
	}, [selectedImage, selectedImage?.path]);

	const allPhotos: GalleryPhoto[] = [
		...images,
		...photos.map((photo) => ({
			...photo,
			camera: true,
		})),
	];


	if (selectedPhoto) {
		return (
			<div className="
				h-full
				bg-black
				flex
				flex-col
				text-white
			">

				<div className="
					flex
					items-center
					justify-between
					p-4
					border-b
					border-white/10
				">

					<button
						onClick={() => setSelectedPhoto(null)}
						className="
							rounded-2xl
							border
							border-white/10
							bg-white/10
							px-4
							py-2
							backdrop-blur-xl
							hover:bg-white/20
						"
					>
						← Back
					</button>


					{selectedPhoto.camera ? (
						<button
							onClick={() => {
								if (!selectedPhoto.id) return;

								removePhoto(selectedPhoto.id);
								setSelectedPhoto(null);
							}}
							className="
								rounded-2xl
								border
								border-red-400/20
								bg-red-400/10
								px-4
								py-2
								backdrop-blur-xl
								hover:bg-red-400/20
							"
						>
							🗑️
						</button>
					) : (
						<div className="w-10" />
					)}

				</div>


				<div className="
					flex-1
					flex
					items-center
					justify-center
					p-6
				">

					<img
						src={selectedPhoto.src}
						alt={selectedPhoto.title}
						className="
							max-w-full
							max-h-full
							object-contain
							select-none
						"
					/>

				</div>

			</div>
		);
	}


	return (
		<div className="
			h-full
			overflow-y-auto
			scrollbar-thin
			scrollbar-thumb-white/20
			scrollbar-track-transparent
			p-6
			text-white
		">

			<h1 className="
				text-3xl
				font-semibold
				mb-6
			">
				Gallery
			</h1>


			<div className="
				grid
				grid-cols-3
				gap-3
			">

				{allPhotos.map((photo,index) => (

					<div
						key={photo.id ?? index}
						onClick={() => setSelectedPhoto(photo)}
						className="
							overflow-hidden
							rounded-2xl
							border
							border-white/10
							bg-white/5
							cursor-pointer
							backdrop-blur-xl
							transition
							hover:scale-[1.03]
							hover:bg-white/10
						"
					>

						<img
							src={photo.src}
							alt={photo.title}
							className="
								w-full
								aspect-square
								object-cover
								select-none
							"
						>


						</img>


						<div className="
							px-2
							py-2
							border-t
							border-white/10
						">

							<p className="
								text-sm
								truncate
							">
								{photo.title}
							</p>

						</div>

					</div>

				))}

			</div>

		</div>
	);
}