import fs from 'fs';
import Link from 'next/link';
import { basename, extname, join } from 'path';

export async function getStaticProps() {
	const apiDir = join(process.cwd(), 'pages');
	const apiFiles = await fs.promises.readdir(apiDir);
	const pages = apiFiles
		.filter((f) => f.endsWith('.tsx') || f.endsWith('.html'))
		.map((f) => basename(f, extname(f)));
	return { props: { pages } };
}

export async function named() {
	const resp = await fetch('../api/hello');
	document.getElementById('content').innerText = await resp.text();
};

export default ({ pages }) => {
	return (
		<div>
			<p>Hello from Deno, powered by Vercel!</p>
			<div id="app"></div>
			<div>
				<h3>Browse:</h3>
				<ul>
					{pages.map((page) => (
						<li key={page}>
							<Link href={`/${[page]}`}>
								<a>{page}</a>
							</Link>
						</li>
					))}
				</ul>
			</div>
      <div id="content">contacting api...</div>
		</div>
	);
};
