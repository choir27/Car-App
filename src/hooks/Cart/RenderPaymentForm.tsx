import Assets from "../../components/Assets";
import { CardInfo } from "../../middleware/Interfaces";

export function RenderPaymentForm(
  cardInfo: CardInfo | undefined,
  setCardInfo: (e: CardInfo) => void,
) {
  return (
    <section className="flex payment alignCenter flex-col">
      <form className="flex flex-col alignCenter">
        <input type="text" defaultValue={cardInfo?.cardNumber} disabled />
        <input type="text" defaultValue={cardInfo?.expirationDate} disabled />
        <input
          type="text"
          defaultValue={cardInfo?.securityNumber}
          maxLength={4}
          disabled
        />
      </form>

      <section className="flex justifyBetween">
        <div
          className="imageContainer"
          onClick={() =>
            setCardInfo({
              type: "Visa",
              cardNumber: 4716108999716531,
              securityNumber: "257",
              expirationDate: "01/32",
            })
          }
        >
          <img
            src={Assets.visa}
            alt="The logo for VISA, with a purple border on top, gold border on the bottom, the text visa in all capitals in purple text in the center, and a white background."
          />
        </div>
        <div
          className="imageContainer"
          onClick={() =>
            setCardInfo({
              type: "Master Card",
              cardNumber: 5281037048916168,
              securityNumber: "043",
              expirationDate: "12/84",
            })
          }
        >
          <img
            src={Assets.mastercard}
            alt="The logo for MasterCard, with a purple background, and a ven diagram where the left circle is red, the right circle is gold, and the text mastercard has the m and c capitalized and in the center of the venn diagram."
          />
        </div>
        <div
          className="imageContainer"
          onClick={() =>
            setCardInfo({
              type: "American Express",
              cardNumber: 342498818630298,
              securityNumber: "3156",
              expirationDate: "05/99",
            })
          }
        >
          <img
            src={Assets.amex}
            alt="The logo for American Expresss, with a sky blue background, white border encasing the text amex, which is all upper cased and in the center."
          />
        </div>
      </section>
    </section>
  );
}
