import { colors } from '@/src/constants';
import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';

export const ChatBox = ({
	color = colors.brand,
	width = 25,
	height = 25,
}: SvgProps) => (
	<Svg fill="none" viewBox="0 0 25 25" width={width} height={height}>
		<Path
			stroke={color}
			strokeLinecap="round"
			strokeWidth="2"
			d="M9.083 9.375h8.334M9.083 13.021h5.73"
		></Path>
		<Path
			fill={color}
			d="M2.052 10.938a.781.781 0 0 0 1.563 0zm1.9 5.34a.781.781 0 1 0-1.444.598zm11.102 6.399.565-.954-1.345-.796-.564.954zm-4.173-.954.565.954 1.344-.796-.564-.954zm2.829.158c-.201.34-.719.34-.92 0l-1.344.796c.806 1.361 2.803 1.361 3.608 0zM11.687 2.865h3.126V1.302h-3.126zm11.199 8.073v1.041h1.562v-1.041zM8.878 19.002c-1.308-.023-1.993-.106-2.53-.328l-.598 1.443c.838.347 1.793.424 3.1.447zm-6.37-2.126a6 6 0 0 0 3.242 3.241l.598-1.443a4.43 4.43 0 0 1-2.396-2.396zm20.377-4.897c0 1.224 0 2.103-.047 2.797-.047.687-.137 1.134-.29 1.502l1.444.598c.244-.59.352-1.228.405-1.994.051-.759.051-1.7.051-2.903zm-5.236 8.585c1.308-.023 2.263-.1 3.101-.447l-.598-1.443c-.537.222-1.222.305-2.53.328zm4.9-4.286a4.43 4.43 0 0 1-2.396 2.396l.598 1.443a6 6 0 0 0 3.241-3.241zM14.813 2.865c1.72 0 2.955 0 3.918.092.952.09 1.558.264 2.04.56l.817-1.332c-.77-.472-1.643-.682-2.709-.783-1.055-.1-2.377-.1-4.067-.1zm9.635 8.073c0-1.69 0-3.012-.1-4.067-.1-1.066-.311-1.94-.783-2.709l-1.332.817c.296.483.47 1.088.56 2.04.092.963.093 2.199.093 3.919zm-3.677-7.42a4.4 4.4 0 0 1 1.462 1.46l1.332-.816a6 6 0 0 0-1.977-1.977zm-9.083-2.216c-1.69 0-3.012 0-4.067.1-1.066.101-1.94.311-2.709.783l.817 1.332c.482-.296 1.088-.47 2.04-.56.963-.091 2.198-.092 3.919-.092zm-8.073 9.636c0-1.72 0-2.956.092-3.919.09-.952.264-1.557.56-2.04l-1.332-.817c-.472.77-.682 1.643-.783 2.71-.1 1.054-.1 2.376-.1 4.066zm1.297-8.753a6 6 0 0 0-1.977 1.977l1.332.817a4.4 4.4 0 0 1 1.462-1.462zm7.314 18.742c-.212-.357-.397-.673-.578-.92a2.3 2.3 0 0 0-.71-.672l-.786 1.35c.05.03.117.082.233.242.127.174.27.413.496.796zm-3.375-.363c.457.008.747.014.968.038.206.023.286.056.333.084l.785-1.35c-.305-.178-.622-.25-.946-.287-.31-.034-.685-.04-1.113-.047zm6.768 1.159c.226-.383.37-.622.496-.796.117-.16.184-.213.233-.241l-.785-1.35c-.303.175-.52.41-.711.67-.18.248-.366.564-.578.921zm2.003-2.721c-.428.007-.803.013-1.113.047-.324.036-.641.109-.946.286l.785 1.35c.047-.026.127-.06.333-.083.221-.024.51-.03.968-.038z"
		></Path>
	</Svg>
);
