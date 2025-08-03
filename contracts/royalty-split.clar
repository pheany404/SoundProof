(define-map royalty-splits
  ((track-id uint))
  (tuple (recipients (list 10 principal)) (shares (list 10 uint)) (locked bool))
)

(define-public (set-royalty
  (track-id uint)
  (recipients (list 10 principal))
  (shares (list 10 uint))
)
  (let (
    (existing (map-get royalty-splits { track-id: track-id }))
  )
    (if (is-some existing)
      (if (is-eq (get locked (unwrap existing)) true)
        (err u403) ;; already locked
        (ok true)
      )
      (ok true)
    )
    ;; Ensure recipients and shares align
    (if (not (is-eq (len recipients) (len shares)))
      (err u400) ;; mismatch
      (ok true)
    )
    ;; Ensure total shares = 100%
    (if (not (is-eq (fold + u0 shares) u10000))
      (err u401) ;; invalid distribution
      (ok true)
    )
    (map-set royalty-splits
      { track-id: track-id }
      { recipients: recipients, shares: shares, locked: false }
    )
    (ok true)
  )
)

(define-public (get-royalty (track-id uint))
  (match (map-get royalty-splits { track-id: track-id })
    royalty (ok royalty)
    none (err u404)
  )
)

(define-public (lock-royalty (track-id uint))
  (match (map-get royalty-splits { track-id: track-id })
    royalty
    (begin
      (map-set royalty-splits
        { track-id: track-id }
        {
          recipients: (get recipients royalty),
          shares: (get shares royalty),
          locked: true
        }
      )
      (ok true)
    )
    none (err u404)
  )
)

(define-private (distribute-funds
  (recipients (list 10 principal))
  (shares (list 10 uint))
  (amount uint)
)
  (fold
    (lambda (pair result)
      (match result
        ok-so-far
        (let (
            (recipient (get recipient pair))
            (share (get share pair))
            (cut (/ (* amount share) u10000))
          )
          (match (stx-transfer? cut tx-sender recipient)
            (ok res) (ok true)
            err err
          )
        )
        err err
      )
    )
    (ok true)
    (zip
      (map (lambda (r) { recipient: r }) recipients)
      (map (lambda (s) { share: s }) shares)
    )
  )
)

(define-public (distribute-royalty (track-id uint) (amount uint))
  (match (map-get royalty-splits { track-id: track-id })
    data
    (let (
      (recipients (get recipients data))
      (shares (get shares data))
    )
      (distribute-funds recipients shares amount)
    )
    none (err u404)
  )
)
