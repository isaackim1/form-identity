interface Props {
  index: number;
  text: string;
}

export function BlueprintAnnotation({ index, text }: Props) {
  return (
    <div className="bp-annotation">
      <span className="bp-annotation-num">0{index}</span>
      <span className="bp-annotation-text">{text}</span>
    </div>
  );
}
