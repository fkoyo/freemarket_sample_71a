require 'rails_helper'

describe Card do
  describe '#create' do
    it "(1)user_idがなければ登録できない" do
      card = Card.new(user_id:"", customer_id:"2", card_id:"3")
      card.valid?
      expect(card.errors[:user_id]).to include("を入力してください")
    end

    it "(2)customer_idがなければ登録できない" do
      card = Card.new(user_id:"1", customer_id:"", card_id:"3")
      card.valid?
      expect(card.errors[:customer_id]).to include("を入力してください")
    end

    it "(3)card_idが無ければ登録できない" do
      card = Card.new(user_id:"1", customer_id:"2", card_id:"")
      card.valid?
      expect(card.errors[:card_id]).to include("を入力してください")
    end
  end
end