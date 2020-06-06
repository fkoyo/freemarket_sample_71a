# README

# DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|nickname|string|null: false
|email|string|null: false, unique: true|
|password|string|null: false, unique: true|
|last_name|string|null: false|
|first_name|string|null: false|
|last_name_fri|string|null: false|
|first_name_fri|string|null: false|
### Association
- has_many:items, dependent: :destroy
- has_many:messages, dependent:destroy
- has_many:rates, dependent: :destroy
- has_many:cards, dependent: :destroy
- has_many:shopping_address, dependent:destroy
- has_many:Purchase_historys, dependent:destroy

## cardsテーブル
|Column|Type|Options|
|------|----|-------|
|customer_id|string|null: false|
|card_id|string|null: false|
|user_id|references|foreign_key: true|
### Association
- belongs_to :user

## shopping_addressテーブル
|Column|Type|Options|
|------|----|-------|
|address_name|string|null: false|
|address_furi|string|null: false|
|post_num|string|null: false|
|prefecture|string|null: false|
|city|string|null: false|
|address|string|null: false|
|billding|string|
|phone_number|string|null: false|
|user|references|foreign_key: true|
### Association
- belongs_to :user

## itemsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|content|text|null: false|
|categories|references|null: false, foreign_key: true|
|size|references|foreign_key: true|
|brand|references|foreign_key: true|
|condition|references|null: false, foreign_key: true|
|fee|references|null: false, foreign_key: true|
|area|references|null: false, foreign_key: true|
|shipping_day|references|null: false, foreign_key: true|
|price|integer|null: false|
|user_seller|references|null: false, foreign_key: true|
### Association
- has_many: images
- has_many: comments
- belongs_to: user
- belongs_to: category
- belongs_to: brand
- belongs_to: size
- belongs_to: condition
- belongs_to: fee
- belongs_to: sipping_day

## photosテーブル
|Column|Type|Options|
|------|----|-------|
|image|string|null: false|
|item|references|null: false, foreign_key: true|
### Association
- belongs_to: item

## categoriesテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|
|item|references|null: false, foreign_key: true|
|ancestry|string|null: false|
### Association
- has_many :items
- has_ancestry

## brandsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|
|item|references|null: false, foreign_key: true|
|ancestry|string|null: false|
### Association
- has_many :items
- has_ancestry

## sizeテーブル
|Column|Type|Options|
|------|----|-------|
|size|string|
|item|references|null: false, foreign_key: true|
### Association
- belongs_to: item

## areasテーブル
|Column|Type|Options|
|------|----|-------|
|area|string|
|item|references|null: false, foreign_key: true|
### Association
- belongs_to: item

## sipping_daysテーブル
|Column|Type|Options|
|------|----|-------|
|sipping_day|string|
|item|references|null: false, foreign_key: true|
### Association
- belongs_to: item

## feesテーブル
|Column|Type|Options|
|------|----|-------|
|fee|string|
|item|references|null: false, foreign_key: true|
### Association
- belongs_to: item

## Purchase_historysテーブル
|Column|Type|Options|
|------|----|-------|
|message|text|null: false|
|user_buyer|references|foreign_key: true|
|item|references|foreign_key: true|
### Association
- belongs_to :user
- belongs_to :item

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|message|text|null: false|
|user|references|null: false, foreign_key: true|
|item|references|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :item

## ratesテーブル
|Column|Type|Options|
|------|----|-------|
|rate|string|
|item|references|null: false, foreign_key: true|
### Association
- belongs_to: user